const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Fonction pour configurer le stockage dynamique
const storage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, "../uploads", folder);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    }
  });

// Fonction pour créer l'instance de `multer`
const upload = (folder) =>
  multer({
    storage: storage(folder),
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPG, PNG, and JPEG files are allowed"), false);
      }
    }
  });

module.exports = upload;

