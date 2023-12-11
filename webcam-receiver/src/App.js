import axios, { Axios } from "axios";
import React, { useState } from "react";
function App() {
  const [capturedImage, setCapturedImage] = useState(null);

  const getImage = async () => {
    try {
      const response = await axios.get(
        "https://webcam.api.ykaan.com.tr/get-image"
      );
      setCapturedImage(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <>
      <h1>Webcam image Receiver</h1>
      <button onClick={getImage}>Resmi Getir</button>
      {capturedImage ? (
        <img src={capturedImage} alt="" />
      ) : (
        <h1>IMAGE NOT FOUND</h1>
      )}
    </>
  );
}

export default App;
