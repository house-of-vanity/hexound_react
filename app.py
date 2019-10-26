from flask import Response, render_template, request, Flask, send_file

app = Flask(__name__, static_folder='web/build/')

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

def main():
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    main()
