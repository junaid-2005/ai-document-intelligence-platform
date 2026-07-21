const express = require("express");
const multer = require("multer");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

router.get("/", authMiddleware, getDocuments);

router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;
