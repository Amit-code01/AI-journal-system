# AI Journal Analyzer

AI Journal Analyzer is a full-stack application that allows users to record daily journal entries and automatically analyze them using an AI model. The system detects the emotional tone of each entry, extracts meaningful keywords, and generates a short summary describing the user's emotional state.

This project demonstrates the integration of modern web technologies with large language models to create a practical AI-powered productivity tool.

---

## Features

* Create and store personal journal entries
* AI-powered emotional analysis
* Automatic keyword extraction
* AI-generated summary of each entry
* Insights dashboard showing emotional trends
* Delete entries
* Re-analyze journal entries
* Loading spinner during AI processing
* Clean and responsive user interface

---

## Tech Stack

### Frontend

* React (Vite)
* JavaScript
* CSS
* Lucide Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Model

* Llama 3.1 via Groq API

---

## Project Structure

```
ai-journal-system
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── EntryForm.jsx
│   │   │   ├── EntriesList.jsx
│   │   │   └── Insights.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── controllers
│   │   └── journalController.js
│   │
│   ├── models
│   │   └── Journal.js
│   │
│   ├── services
│   │   └── llmService.js
│   │
│   ├── routes
│   │   └── journalRoutes.js
│   │
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```
git clone https://github.com/yourusername/ai-journal-analyzer.git
```

---

### Backend Setup

Navigate to backend folder:

```
cd backend
npm install
```

Create a `.env` file:

```
GROQ_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection
PORT=5000
```

Start backend server:

```
npm run dev
```

---

### Frontend Setup

Navigate to frontend folder:

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoints

### Create Entry

```
POST /api/journal
```

### Get Entries

```
GET /api/journal/:userId
```

### Delete Entry

```
DELETE /api/journal/:id
```

### Analyze Entry

```
POST /api/journal/analyze
```

### Get Insights

```
GET /api/journal/insights/:userId
```

---

## Example AI Output

```
Emotion: Calm
Keywords: ocean, waves, relaxation
Summary: The user feels calm and relaxed after spending time near the ocean.
```

---

## Use Cases

* Personal reflection and journaling
* Emotional awareness tracking
* AI-powered mood analysis
* Demonstrating AI integration in full-stack applications

---

## Future Improvements

* User authentication
* Charts for emotion trends
* Sentiment history visualization
* Mobile responsive UI improvements
* Export journal reports

---

## Author

Amit Yadav
