import os
import json
import logging
#import conv_watcher
from flask_cors import CORS
from flask import Response, jsonify, send_from_directory, render_template, request, Flask, send_file
from flask import flash, redirect, url_for
from werkzeug.utils import secure_filename
from database import DataBase

DB = DataBase(scheme='mods.sql')
HOME_DIR = os.path.dirname(os.path.realpath(__file__))
STATIC_DIR = os.path.join(HOME_DIR, 'web', 'build')
UPLOAD_FOLDER = os.path.join(HOME_DIR, 'storage')
TMP_PATH = os.path.join(UPLOAD_FOLDER, 'tmp')
MOD_PATH = os.path.join(UPLOAD_FOLDER, 'mods')
ALLOWED_EXTENSIONS = set(['mod', 'xm', 'it', 's3m'])

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
log = logging.getLogger('hexound_api')
#logging.getLogger("urllib3.connectionpool").setLevel(logging.WARNING)

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
            filename = secure_filename(file.filename)
            file.save(os.path.join(MOD_PATH, filename))
            DB.add_mod(file.filename, file.mimetype)
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
    '''

# Custom static data
@app.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory('web/build/static/', filename)

# Custom static data
@app.route('/chiptune2.js/<path:filename>')
def chiptune2_js(filename):
    return send_from_directory('web/build/chiptune2.js/', filename)

# Custom static data
@app.route('/libopenmpt.js.mem')
def chiptune2_mem():
    return app.send_static_file('libopenmpt.js.mem')

# Custom static data
@app.route('/mod/<path:filename>')
def send_mod(filename):
    return send_from_directory(MOD_PATH, filename)

@app.route("/mods2")
def mods2():
    mods = None
    # set limits and offset of query
    limit = request.args.get('limit', default = 20, type = int)
    offset = request.args.get('offset', default = 0, type = int)
    mods = DB.get_mods(limit=limit, offset=offset)
    return jsonify(mods)

@app.route("/mods")
def mods():
    mods = None
    # set limits and offset of query
    limit = request.args.get('limit', default = 20, type = int)
    offset = request.args.get('offset', default = 0, type = int)
    # open existing mods.json database.
    with open('mods.json') as f:
        mods = json.load(f)
    # ! Fix dates. Some old modules doesn't content date of upload.
    # ! So we need to set it to default value. let it be 1522011600 unixtime
    for mod in mods:
        try:
            isinstance(mod['time'], str)
        except:
            mod['time'] = '1522011600'
    return jsonify(mods[offset:offset+limit])

def main():
    CORS(app)
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()
