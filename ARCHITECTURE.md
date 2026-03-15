# System Architecture

## Overview

AI Journal Analyzer follows a modern full-stack architecture consisting of three primary layers:

1. Frontend (Client)
2. Backend (API Server)
3. Database
4. AI Analysis Service

The system enables users to write journal entries which are stored in the database and optionally analyzed using a language model.

---

## High-Level Architecture

```
User
  |
  v
React Frontend (Vite)
  |
  v
Node.js Express API
  |
  +---- MongoDB Database
  |
  +---- AI Analysis Service (Groq Llama 3.1)
```

---

## Component Description

### 1. Frontend Layer

The frontend is built using React and provides the user interface for interacting with the system.

Responsibilities:

* Display journal entries
* Submit new entries
* Trigger AI analysis
* Display analysis results
* Show insights dashboard

Key components:

* EntryForm
* EntriesList
* Insights

---

### 2. Backend Layer

The backend is implemented using Node.js and Express.js and acts as the central API server.

Responsibilities:

* Handling HTTP requests
* Processing journal entries
* Managing database operations
* Integrating with the AI model
* Returning processed results to the frontend

Main modules:

* Controllers
* Routes
* Services
* Models

---

### 3. Database Layer

MongoDB stores all journal entries and their analysis results.

Journal Schema:

```
{
 userId: String,
 ambience: String,
 text: String,
 createdAt: Date,
 analysis: {
   emotion: String,
   keywords: [String],
   summary: String
 }
}
```

---

### 4. AI Analysis Layer

The AI analysis is handled by a Large Language Model.

Model used:

Llama 3.1 (via Groq API)

Responsibilities:

* Detect emotional tone
* Extract keywords
* Generate short emotional summary

Workflow:

1. User clicks Analyze
2. Backend sends journal text to AI model
3. Model returns structured JSON
4. Backend saves analysis to database
5. Frontend displays result

---

## Data Flow

```
User writes entry
        |
        v
Frontend sends POST request
        |
        v
Backend stores entry in MongoDB
        |
        v
User clicks Analyze
        |
        v
Backend sends text to AI model
        |
        v
AI returns emotion + keywords + summary
        |
        v
Backend updates entry
        |
        v
Frontend displays analysis
```

---

## Scalability Considerations

* Backend is stateless and can be horizontally scaled
* MongoDB supports distributed storage
* AI service can be swapped with other providers
* Frontend can be deployed via CDN

---

## Security Considerations

* API keys stored in environment variables
* No sensitive data stored in frontend
* Input validation on backend
* Controlled API endpoints

---

## Deployment Architecture

```
Frontend  -> Vercel / Netlify
Backend   -> Render / Railway
Database  -> MongoDB Atlas
AI Model  -> Groq API
```

---

## Conclusion

The system architecture ensures clear separation between the user interface, business logic, data storage, and AI processing. This modular design allows the system to scale and integrate additional AI capabilities in the future.
