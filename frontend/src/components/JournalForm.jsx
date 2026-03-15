// frontend/src/components/JournalForm.jsx
import { useState } from "react";
import { createEntry } from "../api";

export default function JournalForm({ entries, setEntries, updateInsights }) {
  const [text, setText] = useState("");
  const [ambience, setAmbience] = useState("Forest");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    try {
      setLoading(true);
      const newEntry = await createEntry({ text, ambience });
      setEntries([newEntry, ...entries]); // add at top
      setText("");
      updateInsights();
    } catch (err) {
      console.error(err);
      alert("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>New Journal Entry</h2>

      <div className="ambience-buttons">
        {["Forest", "Ocean", "Mountain"].map((a) => (
          <button
            key={a}
            className={ambience === a ? "active" : ""}
            onClick={() => setAmbience(a)}
          >
            {a === "Forest" ? "🌲" : a === "Ocean" ? "🌊" : "⛰"} {a}
          </button>
        ))}
      </div>

      <textarea
        placeholder="How did you feel during your session?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="saveBtn"
        disabled={!text.trim() || loading}
        style={{
          background: text.trim() ? "#3C7D59" : "#8fb3a0",
          cursor: text.trim() ? "pointer" : "not-allowed",
        }}
        onClick={submit}
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </div>
  );
}