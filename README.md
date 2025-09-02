# 🚀 AI‑Powered Resume Generator

Generate polished, professional resumes powered by AI — exportable as JSON or PDF. Save time, keep consistency, and let AI help you highlight what matters.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![GitHub stars](https://img.shields.io/github/stars/kudkartanmay/AI-Powered-Resume-Generator?style=social)
<!-- Optional: add CI badge here when available -->

---

## 📚 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🏗️ Architecture](#-architecture)
- [⚙️ Getting Started](#%EF%B8%8F-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [🖥️ Usage](#%EF%B8%8F-usage)
- [🚀 Deployment](#-deployment)
- [🗂️ Project Structure](#%EF%B8%8F-project-structure)
- [🧩 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [❓ FAQ](#-faq)
- [📄 License](#-license)

---

## 🌟 Overview

The AI‑Powered Resume Generator is a full‑stack web application that uses the Google Gemini API to turn your inputs into a clean, structured resume you can export as JSON or PDF. It’s designed for job seekers and students who want high‑quality resumes—fast.

---

## ✨ Features

- 📝 AI‑assisted resume generation from simple prompts or forms
- 🤖 Smart suggestions for skills, experience, achievements, and projects
- 📄 Export in JSON (structured) or PDF (ready to share)
- 🔁 Iterative editing — refine and regenerate
- 🌐 Full‑stack app ready for cloud deployment (Render, AWS, Netlify, Vercel)

---

## 🛠️ Tech Stack

- Backend:
  - Java 21, Spring Boot, Google Gemini API and Maven
- Frontend:
  - React , Node.js, Vite, HTML/CSS/JavaScript
- AI:
  - Google Gemini Flash (GPT 2.0) API

---

## 🏗️ Architecture

```txt
User Input
   │
   ▼
Frontend (React/Vue) ──► Backend (Spring Boot) ──► Gemini AI API
   │                           │
   └───────────────◄───────────┘
            Generated Resume JSON
```

- Frontend collects user details and sends them to the backend
- Backend assembles a prompt and calls Gemini
- The structured resume JSON is returned for display/export

---

## ⚙️ Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/kudkartanmay/AI-Powered-Resume-Generator.git
cd AI-Powered-Resume-Generator
```

### 2) Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 18+ and npm

### 3) Backend Setup

```bash
cd resume-backend-final
# optional: create .env with your keys (see Environment Variables below)
mvn clean install
mvn spring-boot:run
```

Backend by default runs at: http://localhost:8080

### 4) Frontend Setup

```bash
cd ../resume-ai-frontend
npm install
npm run dev
```

Frontend (Vite) runs at: http://localhost:5173

---

## 🔑 Environment Variables

Create these locally or configure them in your deployment provider.

### Backend (.env or System Environment)

```env
# Required for AI
GEMINI_API_KEY=your_gemini_api_key

# Port configuration
# Use one of the following depending on your setup:
PORT=8080          # common on Render/Heroku style platforms
# or
SERVER_PORT=8080   # maps to Spring Boot property server.port
```

Spring Boot will also pick up standard environment variables and map them to `server.port` as needed.

### Frontend (.env or .env.production)

```env
VITE_API_URL=https://your-backend-url.onrender.com
# For local development:
# VITE_API_URL=http://localhost:8080
```

---

## 🖥️ Usage

1. Open the frontend in your browser.
2. Enter details: personal info, experience, education, skills, projects.
3. Click “Generate Resume”.
4. Download or copy the generated JSON or export to PDF.

Tip: Iterate! Tweak your inputs for more tailored results.

---

## 🚀 Deployment

### Backend (Render example)

- Environment: Java 21 Used
- Build Command: `mvn clean package -DskipTests`
- Start Command: `java -jar target/*.jar`
- Env Vars: `GEMINI_API_KEY`, `PORT` (Render provides a PORT)

### Frontend (Render/Netlify/Vercel)

- Root Directory: `resume-ai-frontend`
- Build Command: `npm run build`
- Publish/Output Directory: `dist`
- Env Vars: `VITE_API_URL` pointing to your deployed backend

---

## 🗂️ Project Structure

```txt
AI-Powered-Resume-Generator/
├─ resume-backend-final/      # Spring Boot backend
│  ├─ src/
│  ├─ pom.xml
│  └─ ...
├─ resume-ai-frontend/        # React/Vite (or Vue) frontend
│  ├─ src/
│  ├─ vite.config.ts
│  └─ ...
├─ README.md
└─ LICENSE
```

---

## 🧩 Roadmap

- [ ] Authenticated profiles to save multiple resume versions
- [ ] Templates and themes for PDF
- [ ] Import from LinkedIn/JSON
- [ ] Multi‑language support
- [ ] Fine‑tuned prompts for specific roles (SWE, Product, Data, Design)

Have ideas? Open an issue or PR!

---

## 🤝 Contributing

We welcome contributions!  
1) Fork the repo  
2) Create a branch: `git checkout -b feature/name`  
3) Commit: `git commit -m "feat: add X"`  
4) Push: `git push origin feature/name`  
5) Open a Pull Request

Please follow conventional commit messages if possible.

---

## ❓ FAQ

- Which AI model is used?
  - Google Gemini via API.
- Can I bring my own API key?
  - Yes. Set `GEMINI_API_KEY` in the backend environment.
- Does the app store my data?
  - By default, user inputs are processed in memory and returned. Check your deployment configuration before going to production.

---

## 📄 License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Tanmay Vijay Kudkar
