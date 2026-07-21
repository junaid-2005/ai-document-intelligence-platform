const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  chatWithDocument,
} = require(
  "../controllers/chatController"
);

router.post(
  "/:documentId",
  authMiddleware,
  chatWithDocument
);

module.exports =
  router;