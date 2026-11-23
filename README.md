# Personal CV Webpage with AI Chatbot 🤖📄

A modern, beginner-friendly personal portfolio & CV webpage integrated with an interactive AI chatbot powered by Google Gemini. The chatbot represents you authenticly, answering recruiters' questions strictly based on your provided CV data without hallucinating unlisted qualifications.

---

## Features

- **Personal CV Webpage**: Showcases your Bio, Skills, Experience, Education, Projects, and FAQs in a responsive design built with React & Tailwind CSS.
- **Editable CV Data**: Simply edit `backend/data/cv_data.json` with your real details. All fields start with clear placeholders.
- **Grounded AI Chatbot**: Built with Google's official Gemini SDK (`gemini-2.5-flash` / `gemini-1.5-flash`). Enforces strict anti-hallucination guardrails: if a visitor asks about something not in your CV, it politely directs them to your email or LinkedIn.
- **Dynamic Suggestions**: Suggests relevant follow-up questions to keep visitors and recruiters engaged.
- **Secure by Design**: Your `GEMINI_API_KEY` stays strictly on the backend in `.env` and is never exposed to the frontend or committed to GitHub.
- **Single-Service Render Deployment**: In production, FastAPI serves the compiled React app directly, allowing you to deploy the entire full-stack project as a single, free Web Service on Render!

---

## Project Structure

```
cv-chatbot-project/
├── backend/
│   ├── app/
│   │   ├── config.py         # Loads GEMINI_API_KEY safely from environment
│   │   ├── cv_loader.py      # Reads and formats cv_data.json for prompt injection
│   │   ├── chatbot.py        # Gemini client with strict grounding persona
│   │   └── main.py           # FastAPI REST API & static file server
│   ├── data/
│   │   └── cv_data.json      # Your editable resume with clear placeholders
│   ├── tests/
│   │   └── test_chatbot.py   # Automated tests
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Template for your GEMINI_API_KEY
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Hero, Skills, Experience, Projects, Contact, Chat
│   │   ├── services/api.js   # API client for backend communication
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── .gitignore                # Protects secrets (.env, node_modules, etc.)
├── render.yaml               # Render configuration
└── README.md
```

---

## Step 1: Personalize Your CV Data

Open `backend/data/cv_data.json` in your editor. Replace the marked placeholders with your real details:

```json
{
  "personal": {
    "name": "Jane Doe",
    "title": "Software Engineer & AI Enthusiast",
    "email": "jane.doe@example.com",
    "linkedin": "https://linkedin.com/in/janedoe",
    "github": "https://github.com/janedoe",
    ...
  }
}
```

---

## Step 2: Local Development Setup

### 1. Backend Setup

1. Open a terminal in the project root:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   - **Windows**:
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create your `.env` file:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and set your key from [Google AI Studio](https://aistudio.google.com/):
     ```env
     GEMINI_API_KEY=AIzaSy...
     GEMINI_MODEL=gemini-2.5-flash
     ```
   *(Note: The app will run in demo mode even if you haven't added an API key yet.)*
5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup

1. Open a new terminal in the project root:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## Running Automated Tests

Run backend tests using `pytest`:

```bash
cd backend
pytest tests/
```

---

## Step 3: Pushing to GitHub

Ensure your `.gitignore` is in place so that `.env` and `node_modules` are never uploaded:

1. Initialize git and make your first commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal CV webpage with AI chatbot"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 4: Deploying to Render (Free Web Service)

Render provides free hosting for web services. Because our FastAPI server automatically serves the compiled frontend assets, you can deploy the complete project as a **single Web Service**:

1. Log in to [Render](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Select **Build and deploy from a Git repository** and connect your GitHub repository.
4. Fill in the service configuration:
   - **Name**: `my-cv-chatbot` (or any name you choose)
   - **Language**: `Python`
   - **Branch**: `main`
   - **Build Command**:
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
     ```
   - **Start Command**:
     ```bash
     cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Instance Type**: `Free`
5. Add your Environment Variable:
   - Scroll down to **Environment Variables**.
   - Add `GEMINI_API_KEY` and paste your key from Google AI Studio.
6. Click **Deploy Web Service**.

Once the build finishes, your live CV website and AI Chatbot will be accessible at your Render URL (e.g. `https://my-cv-chatbot.onrender.com`).
