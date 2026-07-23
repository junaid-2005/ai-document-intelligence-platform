# AI Document Intelligence Platform

A production-ready AI-powered document intelligence platform that enables users to upload PDF documents, generate AI summaries, perform semantic search using Retrieval-Augmented Generation (RAG), and interact with documents through an AI chat interface.

---

## Project Overview

AI Document Intelligence Platform combines modern Full Stack Development with Artificial Intelligence to provide intelligent document understanding. Users can securely upload PDF files, extract text, generate summaries, perform semantic search, and ask natural language questions about uploaded documents.

The application is designed with scalable architecture using React, Express.js, PostgreSQL (Supabase), and Google's Gemini AI models.

---

# Features

### Authentication

- Secure User Registration
- User Login
- Protected Routes
- Session Management
- Admin Role Support

### Document Management

- PDF Upload
- Automatic PDF Validation
- Cloud Storage using Supabase Storage
- Document Deletion
- Storage Usage Tracking

### AI Features

- Automatic Text Extraction
- Automatic AI Summary
- Manual Summary Regeneration
- AI Chat with Documents
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings

### Dashboard

- Total Documents
- AI Chat Count
- AI Summary Count
- Storage Analytics
- Recent Uploads

### Usage Limits

- One Active PDF (Free Plan)
- 15 AI Chats per Day
- 5 AI Summaries per Day

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- Lucide React

## Backend

- Node.js
- Express.js
- REST APIs

## Database

- PostgreSQL
- Supabase

## Authentication

- Supabase Authentication

## Cloud Storage

- Supabase Storage

## Artificial Intelligence

- Google Gemini API
- Retrieval-Augmented Generation (RAG)
- Vector Embeddings
- Semantic Search

## Development Tools

- Git
- GitHub
- Visual Studio Code
- Postman

---

# System Architecture

```text
                 User
                  │
                  ▼
        React Frontend (Vite)
                  │
                  ▼
        Express.js REST API
                  │
      ┌───────────┴────────────┐
      ▼                        ▼
Supabase PostgreSQL     Gemini AI API
      │                        │
      ▼                        ▼
Document Metadata      AI Summary
Chat History           AI Chat
Embeddings             Semantic Search
      │
      ▼
Supabase Storage
      │
      ▼
Uploaded PDF Files
```

---

# Application Workflow

```text
User Login
      │
      ▼
Upload PDF
      │
      ▼
Validate PDF
      │
      ▼
Extract Text
      │
      ▼
Generate Summary
      │
      ▼
Chunk Document
      │
      ▼
Generate Embeddings
      │
      ▼
Store in Supabase
      │
      ▼
AI Chat / Semantic Search
      │
      ▼
Dashboard Analytics
```

---

# Folder Structure

```
AI Document Intelligence Platform

client/
    src/
        components/
        pages/
        layouts/
        services/
        context/
        assets/

server/
    controllers/
    middleware/
    routes/
    utils/
    config/
    uploads/

```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-document-intelligence-platform.git
```

Install frontend

```bash
cd client
npm install
```

Install backend

```bash
cd ../server
npm install
```

---

# Environment Variables

## Client

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Server

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
ADMIN_EMAIL=
PORT=5000
```

---

# Running the Project

Frontend

```bash
cd client
npm run dev
```

Backend

```bash
cd server
npm start
```

---

# Current Functionality

- User Authentication
- PDF Upload
- Automatic Text Extraction
- AI Summary Generation
- AI Chat
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Dashboard Analytics
- Chat History
- Daily Usage Limits
- Document Deletion
- Responsive User Interface

---

# Future Improvements

- OCR Support
- Multi-document Chat
- Multiple AI Models
- Summary History
- Export Conversations
- Team Collaboration
- Subscription Plans
- Advanced Analytics
- Cloud Deployment Optimization

---

# Author

**Syed Junaid**

Computer Science Engineering (Artificial Intelligence & Machine Learning)
