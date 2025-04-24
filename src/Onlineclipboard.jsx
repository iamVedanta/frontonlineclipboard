import React, { useState } from "react";
import Axios from "axios";
import "./Onlineclipboard.css";

function Onlineclipboard() {
  const [clipboardData, setClipboardData] = useState("");
  const [recievedData, setRecievedData] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [error, setError] = useState("");

  async function sendClipboardData() {
    if (!clipboardData.trim()) {
      setError("Please enter some text to share");
      return;
    }
    setIsSending(true);
    setError("");
    try {
      const response = await Axios.post(
        `https://onlineclipboard-rq9w.onrender.com/postData`,
        {
          data: clipboardData,
          code: generatedCode,
        }
      );
      setGeneratedCode(response.data);
    } catch (error) {
      setError("Failed to send data. Please try again.");
      console.error("Error sending clipboard data:", error);
    } finally {
      setIsSending(false);
    }
  }

  async function getClipboardData() {
    if (!inputCode) {
      setError("Please enter a code");
      return;
    }
    setIsReceiving(true);
    setError("");
    try {
      const response = await Axios.get(
        `https://onlineclipboard-rq9w.onrender.com/getData/${inputCode}`
      );
      setRecievedData(response.data);
      await navigator.clipboard.writeText(response.data);
    } catch (error) {
      setError("Failed to retrieve data. Please check the code and try again.");
      console.error("Error getting clipboard data:", error);
    } finally {
      setIsReceiving(false);
    }
  }

  return (
    <div className="container">
      <h1 className="title">CopypasteMaga</h1>

      <div className="section">
        <h2 className="section-title">Haku Guru</h2>
        <div className="input-group">
          <textarea
            className="input-field textarea-field"
            value={clipboardData}
            onChange={(e) => setClipboardData(e.target.value)}
            placeholder="Enter text to share..."
          />
          <button
            className="button"
            onClick={sendClipboardData}
            disabled={isSending}
          >
            {isSending ? (
              <div className="loading-spinner"></div>
            ) : (
              "Code Kodappa"
            )}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        {generatedCode && (
          <div className="code-display">
            <h3 className="section-title">Code Banthu Nodu</h3>
            <span className="code">{generatedCode}</span>
          </div>
        )}
      </div>

      <div className="section">
        <h2 className="section-title">Yelko Guru</h2>
        <div className="input-group">
          <input
            type="number"
            className="input-field code-input"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter code..."
          />
          <button
            className="button get-button"
            onClick={getClipboardData}
            disabled={isReceiving}
          >
            {isReceiving ? (
              <div className="loading-spinner"></div>
            ) : (
              "Beku Andhre Click Maadu"
            )}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>

      {recievedData && (
        <div className="section">
          <div className="data-display">{recievedData}</div>
        </div>
      )}
    </div>
  );
}

export default Onlineclipboard;
