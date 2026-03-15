// frontend/src/App.jsx
import { useEffect, useState } from "react";
import JournalForm from "./components/JournalForm";
import EntriesList from "./components/EntriesList";
import Insights from "./components/Insights";
import { getEntries, getInsights } from "./api";
import "./styles.css"

export default function App() {
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);

  const loadEntries = async () => {
    const data = await getEntries();
    setEntries(data);
  };

  const updateInsights = async () => {
    const data = await getInsights();
    setInsights(data);
  };

  useEffect(() => {
    loadEntries();
    updateInsights();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>AI Journal System</h1>
      </div>

      <JournalForm
        entries={entries}
        setEntries={setEntries}
        updateInsights={updateInsights}
      />

      <Insights insights={insights} />

      <EntriesList
        entries={entries}
        setEntries={setEntries}
        updateInsights={updateInsights}
      />
    </div>
  );
}