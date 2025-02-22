from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import os
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Create necessary folders if they don't exist
UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["PROCESSED_FOLDER"] = PROCESSED_FOLDER

# Load YOLO model
model_path = r"D:\GenAI projects\tumor-detect\Backend\best.pt"  # Update with your model path
if not os.path.exists(model_path):
    raise FileNotFoundError(f"YOLO model file not found at {model_path}")

model = YOLO(model_path)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)
    print(f"Uploaded file saved at: {file_path}")

    try:
        # Process the image using YOLO
        results = model(file_path, conf=0.25)
        
        if not results or len(results[0]) == 0:
            return jsonify({"error": "YOLO processing failed or no detection found"}), 500

        processed_filename = "processed_" + file.filename
        processed_file_path = os.path.join(app.config["PROCESSED_FOLDER"], processed_filename)
        print(f"Saving processed image at: {processed_file_path}")

        # Save processed image
        results[0].save(filename=processed_file_path)

        # Return the processed image URL
        return jsonify({
            "message": "File processed successfully",
            "processed_image": f"/processed/{processed_filename}"
        })

    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/processed/<filename>")
def get_processed_image(filename):
    file_path = os.path.join(app.config["PROCESSED_FOLDER"], filename)
    if os.path.exists(file_path):
        return send_file(file_path, mimetype="image/png")  # Adjust mimetype if needed
    return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
