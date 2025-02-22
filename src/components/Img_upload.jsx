import React, { useState, useRef } from "react";

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [processedFrames, setProcessedFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setVideo(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const extractAndProcessFrames = async () => {
    if (!file) {
      setError("Please upload a video first.");
      return;
    }

    setLoading(true);
    setError("");
    setProcessedFrames([]);
    
    const videoElement = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    videoElement.crossOrigin = "anonymous";
    
    videoElement.onloadeddata = async () => {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const frameInterval = 1000 / 5; // Process 5 frames per second

      for (let time = 0; time < videoElement.duration; time += frameInterval / 1000) {
        await new Promise((resolve) => {
          videoElement.currentTime = time;
          videoElement.onseeked = async () => {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const frameData = canvas.toDataURL("image/jpeg");
            await sendFrameToBackend(frameData);
            resolve();
          };
        });
      }
      setLoading(false);
    };
  };

  const sendFrameToBackend = async (frameData) => {
    try {
      const response = await fetch("http://localhost:5000/process_frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: frameData })
      });

      if (!response.ok) throw new Error("Failed to process frame");
      const result = await response.json();
      setProcessedFrames((prevFrames) => [...prevFrames, result.processed_frame]);
    } catch (error) {
      setError("Frame processing failed: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Upload & Process Video</h2>
      <video ref={videoRef} src={video} controls className="video-preview" />
      <input type="file" id="fileInput" accept="video/*" onChange={handleFileChange} className="hidden" />
      <button onClick={handleUploadClick} className="upload-button">Upload Video</button>
      <button onClick={extractAndProcessFrames} className="process-button" disabled={loading}>
        {loading ? "Processing..." : "Process"}
      </button>
      {error && <p className="error-message">{error}</p>}
      <div className="frames-container">
        {processedFrames.map((frame, index) => (
          <img key={index} src={frame} alt={`Processed Frame ${index}`} className="processed-frame" />
        ))}
      </div>
    </div>
  );
}

export default VideoUpload;
