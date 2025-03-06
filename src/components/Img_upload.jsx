import React, { useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = "http://localhost:5000"; // Ensure this matches your backend

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const sendImageToBackend = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to process image: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      console.log("Processed Image Response:", result);

      if (result.processed_image) {
        const imageUrl = `${backendUrl}${result.processed_image}?t=${Date.now()}`;
        setProcessedImage(imageUrl);
      } else {
        throw new Error("Processing failed, no image returned.");
      }
    } catch (error) {
      setError("Image processing failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload & Process Image</h2>

      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="image-preview"
          style={{ maxWidth: "300px", display: "block" }}
        />
      )}

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button onClick={handleUploadClick} className="upload-button">
        Upload Image
      </button>
      <button
        onClick={sendImageToBackend}
        className="process-button"
        disabled={loading}
      >
        {loading ? "Processing..." : "Process"}
      </button>

      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {processedImage && (
        <div>
          <h3>Processed Image:</h3>
          <img
            src={processedImage}
            alt="Processed"
            className="processed-image"
            style={{ maxWidth: "300px", display: "block" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
