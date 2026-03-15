import { ChartColumn } from 'lucide-react';
export default function Insights({ insights }) {
  if (!insights) return null;

  return (
    <div className="card">
      <h2> <ChartColumn />  Insights</h2>
    <div className="insights">
      <div className="card stat">
        <h2>{insights.totalEntries}</h2>
        <p>Total Entries</p>
      </div>

      <div className="card stat">
        <h2>{insights.topEmotion || "-"}</h2>
        <p>Top Emotion</p>
      </div>

      <div className="card stat">
        <h2>{insights.mostUsedAmbience || "-"}</h2>
        <p>Top Ambience</p>
      </div>
    </div>
    </div>
  );
}