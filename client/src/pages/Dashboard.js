import upload from "../assets/upload.jpg";
import success from "../assets/upload_success.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {BASE_URL} from '../utils';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(""); // State for the input field
  const [showUrlSuccess, setShowUrlSuccess] = useState(false); // State for URL success popup

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      const user_id = localStorage.getItem("user_id");
      const form = new FormData();
      form.append('audio', file);
      form.append('user_id', user_id);
      axios.post(`${BASE_URL}/api/audio/`, form).then(() => {
        setShowSuccess(true); // Show success message
        setTimeout(() => setShowSuccess(false), 3000); // Auto-hide after 3 seconds
      }).catch((e) => {
        console.error("error", e);
      });
      
    } else {
      alert("Please select a file to upload!");
    }
  };

  const handleAddUrl = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (currentUrl.trim() && currentUrl.startsWith("http")) {
      axios.post(`${BASE_URL}/api/stream_url/`, {'url': currentUrl}).then((res) => {
        setShowUrlSuccess(true); // Show URL success popup
        setTimeout(() => setShowUrlSuccess(false), 3000); // Auto-hide after 3 seconds
        setCurrentUrl(""); // Clear the input field after adding
      }).catch((e) => {
        console.error("error", e);
        setCurrentUrl("");
      })
    } else {
      alert("Please enter a valid URL starting with http or https.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* File upload success popup */}
      {showSuccess && (
        <div className="success-popup">
          <div className="popup-content">
            <img src={success} />
            <p>File uploaded successfully!</p>
          </div>
        </div>
      )}

      {/* URL addition success popup */}
      {showUrlSuccess && (
        <div className="success-popup">
          <div className="popup-content">
            <img src={success} />
            <p>URL saved successfully!</p>
          </div>
        </div>
      )}

      <div className="input-url-container">
        <div className="upload-text-container">
          <h2>Topic Methods</h2>
          <p>
            Upload your advertisement audio files (.wav format) and let our
            system track and detect them across multiple radio stations in
            real-time or on a schedule. Only you will have access to view, edit,
            and manage your ad detection settings.
          </p>
        </div>

        <div className="url-container">
          <input
            type="url"
            id="url"
            placeholder="Available URL (https://)"
            className="input-url"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)} // Update input value
          />
          <button onClick={handleAddUrl}>Use URL</button>
        </div>
      </div>

      <div className="upload-audio-container">
        <h1>Upload Ad File & Monitor</h1>
        <p>File formats: .wav only. Upload and start tracking today!</p>
        <div className="upload-container">
          <label htmlFor="file-upload">
            <img src={upload} alt="Upload" />
            <h3>Upload Audio</h3>
            <p>{file ? `Selected file: ${file.name}` : "File formats: .wav"}</p>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".wav"
            onChange={handleFileChange}
            className="file-upload-input"
            style={{ display: "none" }} // Hide the input element
          />
        </div>
      </div>

      <div className="submit-btn">
        <button className="skip-btn">Skip this</button>
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
        <Link to="/view-list">
          <button className="view-list">View List</button>
        </Link>
      </div>
    </div>
  );
}
