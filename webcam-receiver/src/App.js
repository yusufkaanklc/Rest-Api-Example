import axios, { Axios } from "axios";
import React, { useState } from "react";
import "./App.css";
function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [click, setClick] = useState(false);

  const getImage = async () => {
    try {
      const response = await axios.get(
        "https://webcam.api.ykaan.com.tr/get-image"
      );
      setCapturedImage(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    setClick((prevClick) => !prevClick);
  };

  return (
    <>
      <h1>Webcam image Receiver</h1>
      {capturedImage ? (
        <>
          <div className="img-box">
            <img src={capturedImage} alt="" />
          </div>
        </>
      ) : click ? (
        <h1>IMAGE NOT FOUND</h1>
      ) : (
        ""
      )}
      <div className="btn-box">
        <button onClick={getImage}>Resmi Getir</button>
      </div>
    </>
  );
}

export default App;
