import React, { useState } from "react";
import Axios from "axios";

function Onlineclipboard() {
  const [clipboardData, setClipboardData] = useState("");
  const [recievedData, setRecievedData] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  function sendClipboardData() {
    console.log("Sending clipboard data:", clipboardData);
    Axios.post(`https://onlineclipboard-rq9w.onrender.com/postData`, {
      data: clipboardData,
      code: generatedCode,
    })
      .then((response) => {
        console.log(response.data);
        setGeneratedCode(response.data);
      })
      .catch((error) => {
        console.error("Error sending clipboard data:", error);
      });
  }

  function getClipboardData() {
    Axios.get(`https://onlineclipboard-rq9w.onrender.com/getData/${inputCode}`)
      .then((response) => {
        setRecievedData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error getting clipboard data:", error);
      });
  }

  return (
    <>
      <h1>Online Clipboard</h1>

      <h2>Clipboard Data:</h2>
      <input
        type="text"
        value={clipboardData}
        onChange={(e) => setClipboardData(e.target.value)}
      />
      <button onClick={sendClipboardData}>Send Clipboard Data</button>

      {generatedCode && <h3>Generated Code: {generatedCode}</h3>}

      <h2>Enter Code to Retrieve Data:</h2>
      <input
        type="number"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button onClick={getClipboardData}>Get Clipboard Data</button>

      <h2>Received Clipboard Data:</h2>
      <input type="text" value={recievedData} readOnly />
    </>
  );
}

export default Onlineclipboard;
