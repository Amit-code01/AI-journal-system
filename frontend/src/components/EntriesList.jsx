import { Sparkles , Loader2 } from "lucide-react";
import { deleteEntry, analyzeText } from "../api";
import { useState } from "react";

export default function EntriesList({ entries, setEntries, updateInsights }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this entry?")) return;

    try {
      await deleteEntry(id);
      setEntries(entries.filter((e) => e._id !== id));
      updateInsights();
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
    }
  };

  const handleAnalyze = async (id) => {
    try {
      setLoadingId(id);

      const updatedEntry = await analyzeText(id);

      setEntries(
        entries.map((e) => (e._id === id ? updatedEntry : e))
      );

      updateInsights();
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
        Journal Entries
      </h2>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="entry flex justify-between items-start p-6 rounded-xl shadow-sm"
          >

            {/* LEFT CONTENT */}
            <div className="flex-1 pr-6">

              <div className="flex items-center gap-2 mb-2">
                <span className="tag">
                  {entry.ambience === "Forest"
                    ? "🌲"
                    : entry.ambience === "Ocean"
                    ? "🌊"
                    : "⛰"}{" "}
                  {entry.ambience}
                </span>

                <span className="text-gray-400 text-sm">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 mb-2">{entry.text}</p>

              {entry.analysis?.emotion && (
                <div className="analysis">
                  <h4>{entry.analysis.emotion}</h4>

                  <p>{entry.analysis.summary}</p>

                  <div className="keywords">
                    {entry.analysis.keywords?.map((k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

           {/* RIGHT BUTTON PANEL */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
    minWidth: "120px"
  }}
>

  {/* ANALYZE / RE-ANALYZE BUTTON */}
  <button
    onClick={() => handleAnalyze(entry._id)}
    disabled={loadingId === entry._id}
    style={{
      background: entry.analysis?.emotion ? "#62880f" : "#3C7D59",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "6px 10px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
      width: "100%",
      justifyContent: "center"
    }}
  >
    {loadingId === entry._id ? (
      <>
        <Loader2 size={14} className="spin" />
        Analyzing...
      </>
    ) : entry.analysis?.emotion ? (
      <>
        <Loader2 size={14} />
        Re-Analyze
      </>
    ) : (
      <>
        <Sparkles size={14} />
        Analyze
      </>
    )}
  </button>

  {/* REMOVE BUTTON */}
  <button
    onClick={() => handleDelete(entry._id)}
    style={{
      background: "#e74c3c",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "6px 10px",
      cursor: "pointer",
      width: "100%"
    }}
  >
    REMOVE
  </button>

</div>

          </div>
        ))}
      </div>
    </div>
  );
}