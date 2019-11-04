import os
import json
#import conv_watcher
from flask_cors import CORS
from flask import Response, jsonify, send_from_directory, render_template, request, Flask, send_file
from flask import flash, redirect, url_for
from werkzeug.utils import secure_filename

HOME_DIR = os.path.dirname(os.path.realpath(__file__))
STATIC_DIR = "{}/web/build".format(HOME_DIR)
UPLOAD_FOLDER = "{}/uploads".format(HOME_DIR)
ALLOWED_EXTENSIONS = set(['mod', 'xm', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
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
# def index():
#     return render_template(
#             'index.html',
#             css=CSS,
#             qfmt=QFMT,
#             afmt=AFMT,
#             version=__version__,
#             )

# upload mechanics
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    message = request.args.get('message',
        default='Choose file to upload',
        type = str)
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload_file',
                                    message="File uploaded."))
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
    return send_from_directory('storage/mods', filename)

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
