from flask import Flask, request

app = Flask(__name__)
ALLOWED_EXTENSIONS = {"mp4", "flv", "mov", "wmv", "mkv", "webm"}

@app.route("/ingest", methods = ["POST"])
def ingest():
  # check if files uploaded
  if "video" not in request.files:
    return {"error": "no file uploaded"}, 400
  
  file = request.files["video"]
  if not allowed_file_type(file.filename):
    return {"error": "file type not supported"}, 400
 
  # TODO: start video encoding process with ffmpeg
  # TODO: generate random unique video id
  # TODO: respond with success and video id
    
  return {"foo": "bar"}

def allowed_file_type(filename: str):
  if "." not in filename:
    return False
  
  extension = filename.rsplit(".", 1)[1].lower()

  return extension in ALLOWED_EXTENSIONS