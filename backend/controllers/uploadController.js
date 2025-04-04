import multer from "multer";
import path from "path";
import fs from "fs";

// Configure storage for multer
const createStorage = (uploadDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fullUploadDir = path.resolve("public", uploadDir);

      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(fullUploadDir)) {
        fs.mkdirSync(fullUploadDir, { recursive: true });
      }

      cb(null, fullUploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

const imageStorage = createStorage("uploads/images");

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Endast bildfiler är tillåtna"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
});

// Controller function for image upload
export const uploadImage = (req, res) => {
  imageUpload.single("imageFile")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Ingen bild har laddats upp" });
    }

    res.json({
      filename: req.file.filename,
      path: `/public/uploads/images/${req.file.filename}`,
    });
  });
};
