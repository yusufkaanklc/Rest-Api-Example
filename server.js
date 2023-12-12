const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;
const uploadPath = path.join(__dirname, "uploads");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.post("/upload", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image data provided." });
  }

  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  const uniqueFileName = generateUniqueFileName();
  const filePath = path.join(uploadPath, uniqueFileName);

  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).json({ error: "Error writing file." });
    }

    console.log("Image saved successfully.");
    res.json({ success: true, message: "Image uploaded successfully." });
  });
});

app.get("/get-image", (req, res) => {
  const files = fs.readdirSync(uploadPath);

  if (files.length === 0) {
    return res.status(404).json({ error: "No uploaded images found." });
  }

  // İlk dosyayı al ve istemciye gönder
  const fileName = files[0];
  const filePath = path.join(uploadPath, fileName);

  fs.readFile(filePath, "base64", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading file." });
    }

    res.send(`data:image/jpeg;base64,${data}`);
  });
});

function generateUniqueFileName() {
  // Rastgele bir string oluştur
  const randomString = Math.random().toString(36).substring(2, 15);
  const timestamp = new Date().getTime();
  return `uploaded_image_${randomString}_${timestamp}.jpg`;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
