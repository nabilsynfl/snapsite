//Express Initialiazation
const fs = require('fs')
const express = require("express");
const db = require("./config/database");
const Articles = require("./models/articles");
const app = express();
const sequelizeStore = require("connect-session-sequelize");

//CORS Initialization
const cors = require("cors");

//Express Session Initializatio
const session = require("express-session");

//Environment setup
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//API Routes
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const downloaders = require("./routes/downloaders");
const deleteRoutes = require("./routes/delete");

//Midleware Logs
const middlewareLog = require("./middleware/logs");

//Midleware
(async () => {
  await db.sync(Articles);
})();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
  })
);

app.use(middlewareLog);
app.use(express.json());
app.use("/public/images", express.static("public/images"));
app.use(authRoutes);
const upload = require("./middleware/multer");
// store.sync();

app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang",
  });
});

//API users
app.use("/users", usersRoutes);

//API articles
app.use("/articles", articlesRoutes);

//API products
app.use("/products", productsRoutes);

//API Downloader youtube
app.use("/downloaders", downloaders);

app.post("/upload", upload.single("file"), (req, res) => {
  const imageUrl = req.file ? req.file.path : "";
  res.json({
    message: "Upload Berhasil",
    url: imageUrl,
  });
});

// Endpoint untuk menghapus gambar
app.delete("/delete-image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = `public/images/${imageName}`;

  // Proses penghapusan gambar menggunakan fs.unlink
  // Pastikan Anda menghandle error jika terjadi kesalahan saat menghapus file
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Failed to delete image", serverMessage: err.message });
    }
    res.json({ message: "Image deleted successfully" });
  });
});

//Server Port
app.listen(PORT, () => {
  console.log(`Server Berhasil di running di port ${PORT}`);
});
