// frontend/src/api.js
const API_BASE = "http://localhost:5000/api";

// Hardcoded userId for now
const USER_ID = "123";

// Create new entry
export const createEntry = async (data) => {
  const res = await fetch(`${API_BASE}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: USER_ID, ...data }),
  });
  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
};

// Get all entries
export const getEntries = async () => {
  const res = await fetch(`${API_BASE}/journal/${USER_ID}`);
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
};

// Delete entry
export const deleteEntry = async (id) => {
  const res = await fetch(`${API_BASE}/journal/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete entry");
  return res.json();
};

// Get insights
export const getInsights = async () => {
  const res = await fetch(`${API_BASE}/journal/insights/${USER_ID}`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
};

// Analyze text (if you want LLM)
export const analyzeText = async (entryId) => {
  const res = await fetch(`${API_BASE}/journal/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entryId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Analysis failed");
  }

  return data;
};