import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./App.css";

const CameraComponent = () => {
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Image = convertToBase64(imageSrc);
    setClick((prevClick) => !prevClick);
    setClick2((prevClick2) => !prevClick2);
    setTimeout(() => {
      setClick((prevClick) => !prevClick);
    }, 100);
    setTimeout(() => {
      setClick2((prevClick2) => !prevClick2);
    }, 5000);
    try {
      await axios.post("https://webcam.api.ykaan.com.tr/upload", {
        image: base64Image,
      });
      setError(false);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
      setErrorMessage("Error: ", error);
    }
  }, [webcamRef]);

  const convertToBase64 = (imageSrc) => {
    const base64Image = imageSrc.split(",")[1];
    return base64Image;
  };
  return (
    <div className="App" style={{ background: click ? "white" : "black" }}>
      <h1 style={{ color: click ? "black" : "white" }}>Webcam App</h1>
      <div className="webcam-box">
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <div className="button-box">
        <button onClick={capture}>Take Picture</button>
      </div>
      {click2 ? (
        error ? (
          <div style={{ color: "white" }}>{errorMessage}</div>
        ) : (
          <div
            className="popup"
            style={{
              color: "white",
              position: "relative",
              bottom: "-10%",
              paddingLeft: "20px",
              width: "300px",
              background: "gray",
              padding: "20px",
              marginLeft: "10px",
              borderRadius: "20px",
            }}
          >
            The image has been transmitted successfully, you can view it from
            the recipient application
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CameraComponent;
