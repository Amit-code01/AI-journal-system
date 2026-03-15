const Journal = require("../models/Journal");
const { analyzeJournal } = require("../services/llmService");

exports.createEntry = async (req, res) => {
  const entry = await Journal.create(req.body);
  res.json(entry);
};

exports.getEntries = async (req, res) => {
  const entries = await Journal.find({
    userId: req.params.userId
  }).sort({ createdAt: -1 });

  res.json(entries);
};

exports.getInsights = async (req, res) => {

  const entries = await Journal.find({
    userId: req.params.userId
  });

  const totalEntries = entries.length;

  const emotionCount = {};
  const ambienceCount = {};
  let keywords = [];

  entries.forEach(e => {

    if (e.analysis?.emotion)
      emotionCount[e.analysis.emotion] =
        (emotionCount[e.analysis.emotion] || 0) + 1;

    ambienceCount[e.ambience] =
      (ambienceCount[e.ambience] || 0) + 1;

    if (e.analysis?.keywords)
      keywords.push(...e.analysis.keywords);
  });

  const topEmotion =
    Object.keys(emotionCount).reduce((a, b) =>
      emotionCount[a] > emotionCount[b] ? a : b, "");

  const mostUsedAmbience =
    Object.keys(ambienceCount).reduce((a, b) =>
      ambienceCount[a] > ambienceCount[b] ? a : b, "");

  res.json({
    totalEntries,
    topEmotion,
    mostUsedAmbience,
    recentKeywords: keywords.slice(-5)
  });
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Journal.findByIdAndDelete(req.params.id);

    if (!entry)
      return res.status(404).json({ error: "Entry not found" });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.analyzeEntry = async (req, res) => {
  try {

    const { entryId } = req.body;

    const entry = await Journal.findById(entryId);

    if (!entry)
      return res.status(404).json({ error: "Entry not found" });

    // CACHE: avoid calling AI again
    if (entry.analysis?.emotion) {
      return res.json(entry);
    }

    const analysis = await analyzeJournal(entry.text);

    entry.analysis = analysis;

    await entry.save();

    res.json(entry);

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI analysis failed" });
  }
};