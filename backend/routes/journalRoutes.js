const express = require("express");

const router = express.Router();
const { analyzeEntry } = require("../controllers/journalController");
const {
 createEntry,
 getEntries,
 getInsights,
 deleteEntry
} = require("../controllers/journalController");

router.post("/journal",createEntry);

router.get("/journal/:userId",getEntries);

router.post("/journal/analyze", analyzeEntry);
router.get("/journal/insights/:userId",getInsights);
router.delete("/journal/:id", deleteEntry);

module.exports = router;