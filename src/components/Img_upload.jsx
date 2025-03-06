import React, { useState } from "react";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const sendImageToBackend = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setProcessedImage("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image.");
      }

      const data = await response.json();
      setProcessedImage(data.processed_image);
    } catch (error) {
      setError("Error uploading image: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload & Process Image</h2>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button onClick={handleUploadClick} className="upload-button">
        Select Image
      </button>
      <button onClick={sendImageToBackend} className="process-button" disabled={loading}>
        {loading ? "Processing..." : "Process Image"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {processedImage && (
        <div>
          <h3>Processed Image</h3>
          <img src={processedImage} alt="Processed" className="processed-image" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
