import os
from pathlib import Path
from typing import List, Dict, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.config import settings
from app.cv_loader import load_cv_data
from app.chatbot import get_chat_response, DEFAULT_SUGGESTIONS

app = FastAPI(
    title="Personal CV & AI Chatbot API",
    description="Backend API powering the personal CV website and Google Gemini chatbot.",
    version="1.0.0"
)

# Enable CORS for local development (Vite frontend on 5173/3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    suggestions: List[str]

@app.get("/api/health")
def health_check():
    """Health check and Gemini configuration status."""
    return {
        "status": "healthy",
        "has_gemini_key": settings.has_gemini_key,
        "model": settings.GEMINI_MODEL
    }

@app.get("/api/cv")
def get_cv():
    """Returns the parsed CV data to render the webpage."""
    return load_cv_data()

@app.get("/api/suggestions")
def get_suggestions():
    """Returns starter suggestion questions."""
    return {"suggestions": DEFAULT_SUGGESTIONS}

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """Answers visitor questions using Google Gemini and CV context."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    # Convert history models to dicts
    history_dicts = [{"role": m.role, "content": m.content} for m in request.history] if request.history else []
    
    result = get_chat_response(request.message, history_dicts)
    return ChatResponse(
        reply=result["reply"],
        suggestions=result.get("suggestions", DEFAULT_SUGGESTIONS)
    )

# Static file serving for single-service deployment (e.g., Render)
if settings.FRONTEND_DIST.exists():
    # Mount assets folder
    assets_dir = settings.FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    # Serve index.html for SPA frontend routes
    @app.get("/{full_path:path}")
    def serve_frontend(full_path: str):
        # Don't intercept /api routes
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = settings.FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(settings.FRONTEND_DIST / "index.html")
else:
    @app.get("/")
    def index():
        return {
            "message": "Personal CV & AI Chatbot API is running.",
            "docs_url": "/docs",
            "note": "Frontend dist folder not found. In development, run 'npm run dev' inside the frontend/ directory."
        }
