const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { generateSummary } = require("../controllers/summaryController");

router.post("/:documentId", authMiddleware, generateSummary);

module.exports = router;
