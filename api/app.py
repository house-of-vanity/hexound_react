import os
import json
import logging
import hashlib
from flask_cors import CORS
from flask import Response, jsonify, send_from_directory, render_template, request, Flask, send_file
from flask import flash, redirect, url_for
from werkzeug.utils import secure_filename
from database import DataBase
from ffprobe import Ffprobe

HOME_DIR = os.path.dirname(os.path.realpath(__file__))
DB = DataBase(
    scheme=os.path.join(HOME_DIR, 'mods.sql'),
    basefile=os.path.join(HOME_DIR, 'data.sqlite'))
STATIC_DIR = os.path.join(HOME_DIR, '..', 'web', 'build')
UPLOAD_FOLDER = os.path.join(HOME_DIR, 'storage')
TMP_PATH = os.path.join(UPLOAD_FOLDER, 'tmp')
MOD_PATH = os.path.join(UPLOAD_FOLDER, 'mods')
ALLOWED_EXTENSIONS = set(['mod', 'xm', 'it', 's3m'])

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
log = logging.getLogger('hexound_api')
#logging.getLogger("urllib3.connectionpool").setLevel(logging.WARNING)

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

app = Flask(
    __name__,
    static_folder=os.path.realpath(STATIC_DIR))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def root():
    return app.send_static_file('index.html')

# upload mechanics
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    message = request.args.get('message',
        default='Choose file to upload',
        type = str)
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            log.info("No file part")
            return redirect(url_for('upload_file',
                                    message="No file part, bad request."))
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            log.info("No selected file")
            return redirect(url_for('upload_file',
                                    message="No selected file"))
        if file and allowed_file(file.filename):
            log.info(f"Going to upload {file.filename}")
            sec_filename = secure_filename(file.filename)
            file.save(os.path.join(MOD_PATH, sec_filename))
            file_meta = {
                "secure_name": ' '.join(
                    sec_filename.split('.')[0:-1]).capitalize().replace(
                        '_', ' '),
                "real_name": sec_filename,
                "mime": file.mimetype,
                "hash": md5(os.path.join(MOD_PATH, sec_filename))}
            find_mod = DB.find_mod(file_meta['real_name'])
            if find_mod:
                appenix = str(int(find_mod[0][0]) + 1) + '_'
                file_meta["real_name"] = appenix + file_meta["real_name"]
            find_mod = DB.find_mod(file_meta['hash'])
            if find_mod:
                mod = DB.get_mod(find_mod[0][0])
                file_meta["real_name"] = mod["real_name"]
            metadata = Ffprobe(os.path.join(MOD_PATH, sec_filename)).metadata
            file_meta['title'] = metadata['format']['tags'].get(
                'name', file_meta['secure_name'])
            file_meta['sample'] = metadata['format']['tags'].get(
                'sample', None)
            file_meta['message'] = metadata['format']['tags'].get(
                'message', None)
            DB.add_mod(file_meta)
            return redirect(url_for('upload_file',
                                    message="File uploaded."))
        elif not allowed_file(file.filename):
            return redirect(url_for('upload_file',
                                    message=f"{file.mimetype} not allowed."))
    return f'''
    <!doctype html>
    {message}
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    <h3>Curl command for bulk upload:</h3>
    <code>find . -exec curl -X POST -F file=@"{{}}" http://localhost:5000/upload \;</code>
    '''
@app.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory(os.path.join(STATIC_DIR, 'static'), filename)

@app.route('/<path:filename>')
def custom_static_root(filename):
    return send_from_directory(STATIC_DIR, filename)

@app.route('/mod/<path:mod_id>')
def send_mod(mod_id):
    mod_meta = DB.get_mod(mod_id)
    return send_file(
        os.path.join(MOD_PATH, mod_meta['real_name']), as_attachment=True)

@app.route('/meta/<path:mod_id>')
def metadata(mod_id):
    mod_meta = DB.get_mod(mod_id)
    return jsonify(mod_meta)

@app.route("/mods")
def mods():
    mods = None
    # set limits and offset of query
    limit = request.args.get('limit', default = 20, type = int)
    offset = request.args.get('offset', default = 0, type = int)
    mods = DB.get_mods(limit=limit, offset=offset)
    return jsonify(mods)

def main():
    CORS(app)
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()
