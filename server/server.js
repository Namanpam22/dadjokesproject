const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");

const upload = multer({ dest: "uploads/" });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "starjokes",
});

// Enable CORS with default options
app.use(cors());

// Or, you can customize the CORS options
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const imageId = req.body.image;
  const imageUrl = req.body.imageUrl;

  axios
    .get(imageUrl, { responseType: "arraybuffer" })
    .then((response) => {
      const imageBuffer = response.data;

      const sql = "INSERT INTO images (image_id, image_data) VALUES (?, ?)";
      connection.query(sql, [imageId, imageBuffer], (err, result) => {
        if (err) throw err;
        console.log("Image uploaded successfully");
        res.send("Image uploaded successfully");
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading image");
    });
});

app.get("/favourites", (req, res) => {
  const sql = "SELECT * FROM images";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/uploads/:imageId", (req, res) => {
    const imageId = req.params.imageId;
    const sql = "SELECT image_data FROM images WHERE image_id = ?";
    connection.query(sql, [imageId], (err, result) => {
      if (err) throw err;
      if (result && result.length > 0) {
        const imageBuffer = result[0].image_data;
        res.set("Content-Type", "image/jpeg");
        res.set("Content-Disposition", `attachment; filename="${imageId}.jpg"`);
        res.send(imageBuffer);
      } else {
        res.status(404).send("Image not found");
      }
    });
  });

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
