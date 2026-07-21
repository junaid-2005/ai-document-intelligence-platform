const express = require("express");
const cors = require("cors");
require("dotenv").config();

const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");
const searchRoutes = require("./routes/searchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Document Intelligence Platform API",
    version: "1.0.0",
    status: "Running",
  });
});

app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
