import os
import json
from flask_cors import CORS
from flask import Response, jsonify, send_from_directory, render_template, request, Flask, send_file

HOME_DIR = os.path.dirname(os.path.realpath(__file__))
STATIC_DIR = "{}/web/build".format(HOME_DIR)
app = Flask(
    __name__,
    static_folder=os.path.realpath(STATIC_DIR))

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

# Custom static data
@app.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory('web/build/static/', filename)

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
