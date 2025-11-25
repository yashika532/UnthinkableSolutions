import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (
      selected.type !== "application/pdf" &&
      !selected.type.startsWith("image/")
    ) {
      setError("Only PDF or image files are allowed");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (
      droppedFile.type !== "application/pdf" &&
      !droppedFile.type.startsWith("image/")
    ) {
      setError("Only PDF or image files are allowed");
      setFile(null);
      return;
    }

    setError("");
    setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setExtractedText("");
    setSuggestions([]);

    try {
      const res = await axios.post(API_BASE_URL + "/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.success) {
        setExtractedText(res.data.extractedText || "");
        setSuggestions(res.data.suggestions || []);
      } else {
        setError(res.data.message || "Failed to analyze file");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong while uploading"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Social Media Content Analyzer</h1>
        <p>
          Upload a PDF or image of your post. We&apos;ll extract the text and
          suggest engagement improvements.
        </p>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <div
            className={`dropzone ${dragActive ? "active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>
              Drag &amp; drop a PDF or image here,
              <br />
              or click to select a file.
            </p>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
            />
            {file && (
              <p className="file-name">
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </div>

          <button
            className="analyze-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Content"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </section>

        <section className="results-section">
          <div className="card">
            <h2>Extracted Text</h2>
            {loading ? (
              <p className="muted">Processing file, please wait...</p>
            ) : extractedText ? (
              <pre className="extracted-text">{extractedText}</pre>
            ) : (
              <p className="muted">
                No text yet. Upload a file and click &quot;Analyze Content&quot;.
              </p>
            )}
          </div>

          <div className="card">
            <h2>Engagement Suggestions</h2>
            {loading ? (
              <p className="muted">Generating suggestions...</p>
            ) : suggestions && suggestions.length > 0 ? (
              <ul className="suggestions-list">
                {suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            ) : (
              <p className="muted">
                Suggestions will appear here after analysis.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <span>Built with MERN • Tech Assessment Demo</span>
      </footer>
    </div>
  );
}

export default App;
