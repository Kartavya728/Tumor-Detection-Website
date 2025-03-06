# 🧠 Tumor Detection Web App  
![Tumor Detection]([https://media.giphy.com/media/3o6ZsY8ReZpDz2c7ug/giphy.gif](https://www.nickmez.com/assets/btd.gif))  

🚀 **An AI-powered web app that detects brain tumors from MRI scans** using a **custom-trained YOLO model**.  
📸 **Upload an image → Get results with probability & bounding boxes**!  

---

## **🌟 Features**  
✅ **Upload MRI Scans** and detect tumors 📷  
✅ **Trained YOLOv8 model** for tumor localization 🧠  
✅ **Displays bounding boxes & probability %** 📊  
✅ **Processed image preview after detection** 🔍  
✅ **Flask API Backend & React Frontend** 🚀  

---

## **📸 Demo**  
🔹 **Step 1:** Upload an MRI Scan  
🔹 **Step 2:** Click **"Process"** to detect tumor  
🔹 **Step 3:** View detected tumor with probability %  

---

## **🛠️ Tech Stack**  
![Python](https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python)  
![Flask](https://img.shields.io/badge/Flask-Backend-green?style=for-the-badge&logo=flask)  
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)  
![YOLOv8](https://img.shields.io/badge/YOLOv8-Object%20Detection-red?style=for-the-badge)  

---

## **📂 Project Structure**  
📂 tumor-detect │── 📁 Backend │ ├── 📂 uploads/ # Stores uploaded images │ ├── 📂 processed/ # Stores processed images │ ├── server.py # Flask API handling requests │── 📁 Frontend │ ├── 📄 img_upload.jsx # React component for image upload │── 📄 README.md # This file

yaml
Copy
Edit

---

## **🚀 Setup & Run Instructions**  

### **1️⃣ Install Dependencies**  
#### 🖥️ Backend (Flask)  
```sh
pip install flask flask-cors ultralytics
🌐 Frontend (React)
sh
Copy
Edit
npm install
2️⃣ Run the Backend
sh
Copy
Edit
python server.py
3️⃣ Run the Frontend
sh
Copy
Edit
npm start
📜 API Endpoints
Endpoint	Method	Description
/upload	POST	Uploads an image & processes it with YOLO
/processed/<filename>	GET	Fetches the processed image
💡 Model Training & Results
Your YOLOv8 model was trained on MRI tumor datasets to classify and detect tumor regions. 🧠
📌 Example Bounding Box Output:

🙌 Contributing
Feel free to fork this repo, raise issues, or improve the model! 🔥

📃 License
This project is MIT Licensed. Feel free to use and modify! 🚀
