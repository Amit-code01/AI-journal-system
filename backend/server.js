require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const journalRoutes = require("./routes/journalRoutes");

const app = express();

// Allow frontend URL from .env
app.use(cors({
  origin: "https://ai-journal-system-chi.vercel.app/"
,}));

app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api", journalRoutes);

// Use dynamic PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});