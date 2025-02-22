from ultralytics import YOLO
import cv2

# Load the trained model
model = YOLO(r"D:\GenAI projects\tumor-detect\Backend\best.pt")  # Path to best model weights

# Load and predict on a new MRI image
results = model(r"D:\GenAI projects\tumor-detect\Backend\00059_103.jpg", conf=0.25)  # Confidence threshold

# Show output
results[0].show()