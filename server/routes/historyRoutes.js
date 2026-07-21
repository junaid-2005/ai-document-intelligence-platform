const express = require("express");

const {
  getAllDocuments,
} = require(
  "../controllers/documentHistoryController"
);

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllDocuments
);

module.exports = router;