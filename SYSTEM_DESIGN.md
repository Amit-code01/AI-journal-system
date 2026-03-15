# AI Journal Analyzer – System Design & AI Highlights

This document explains the AI-specific architecture, workflows, and design decisions in the **AI Journal Analyzer** project.

---

## 1. Overview of AI Integration

The AI integration is the **core feature** of this project:

* Automatically analyzes journal entries
* Detects emotional state (e.g., calm, stressed, peaceful)
* Extracts **keywords** relevant to the user’s mood
* Generates a **summary sentence** describing the emotion

AI processing occurs **on-demand**, triggered by the user clicking **“Analyze”** in the frontend.

---

## 2. AI Workflow

```mermaid
flowchart TD
    A[User writes journal entry] --> B[Frontend sends POST /api/journal]
    B --> C[Backend stores entry in MongoDB]
    D[User clicks Analyze] --> E[Backend calls LLM service]
    E --> F[Groq API: Llama 3.1 model]
    F --> G[Return JSON: {emotion, keywords, summary}]
    G --> H[Backend saves analysis in MongoDB]
    H --> I[Frontend displays emotion, keywords & summary]
```

**Highlights**:

* **LLM Service** is encapsulated in `services/llmService.js`
* **Backend Controller** handles API requests and stores AI output
* **Frontend** dynamically updates the entry after AI analysis

---

## 3. AI Model

* **Model**: Llama 3.1 via **Groq API**
* **Task**: Emotional analysis of text
* **Input**: Journal entry string
* **Output (JSON)**:

```json
{
  "emotion": "calm",
  "keywords": ["ocean", "waves", "relaxation"],
  "summary": "User feels calm and relaxed after spending time near the ocean."
}
```

* **Key Configs**:

  * Temperature: 0.3 (controlled creativity)
  * Strict JSON output for easy backend parsing

---

## 4. Backend AI Service Design

**File:** `services/llmService.js`

Responsibilities:

* Encapsulate all AI calls
* Handle errors and fallback responses
* Maintain consistent JSON format for the frontend
* Example:

```javascript
const { GroqClient } = require("@groq/groq-js");

async function analyzeJournal(text) {
    try {
        const response = await groqClient.generate({
            model: "llama3-8b",
            input: `Analyze this journal entry and return JSON with emotion, keywords, summary: ${text}`,
        });
        return JSON.parse(response.output_text);
    } catch (err) {
        return {
            emotion: "unclear",
            keywords: [],
            summary: "AI could not determine the emotion clearly."
        };
    }
}
module.exports = { analyzeJournal };
```

---

## 5. Frontend Integration

* **File:** `components/EntriesList.jsx`
* **AI Features**:

  * Analyze button triggers backend AI call
  * Loading spinner during analysis
  * Displays emotion, keywords, and summary dynamically
  * Re-analyze option allows users to update AI results
* **UI Highlights**:

  * 🌊 Ocean, 🌲 Forest, ⛰ Mountain icons
  * Color-coded buttons
  * Insights panel aggregates AI results

---

## 6. AI Data Flow

| Stage               | Input           | Processing                                | Output                               |
| ------------------- | --------------- | ----------------------------------------- | ------------------------------------ |
| User writes entry   | Text & Ambience | Stored in DB                              | Raw entry                            |
| User clicks Analyze | Entry ID        | Backend calls LLM                         | JSON with emotion, keywords, summary |
| Update DB           | JSON            | Store analysis in entry                   | Updated entry                        |
| Display             | Updated entry   | Frontend shows emotion, keywords, summary | Visualization to user                |

---

## 7. Error Handling & Fallbacks

* AI may fail due to:

  * API quota limits
  * Invalid API keys
  * Network issues
* **Fallback:**

  ```json
  {
    "emotion": "unclear",
    "keywords": [],
    "summary": "AI could not determine the emotion clearly."
  }
  ```
* Frontend shows **“Analysis Failed”** message if AI cannot process

---

## 8. Key AI Design Decisions

* **Stateless AI calls**: Each analysis is independent
* **Strict JSON** ensures backend can safely parse
* **Re-analysis supported** for updated insights
* **Insights aggregation** is derived from AI-analyzed entries
* **Scalability**:

  * Multiple backend instances can call AI API in parallel
  * Future AI provider can be swapped easily

---

## 9. AI Highlights Summary

* **AI Powers**:

  * Emotional tone detection
  * Keyword extraction
  * Short summaries
  * Aggregated insights
* **Frontend**: Real-time user feedback with spinner
* **Backend**: Error handling, JSON standardization, MongoDB storage
* **End Result**: Professional, demonstrable AI-powered journaling system

---

## Author

Amit Yadav


