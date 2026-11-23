import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.cv_loader import load_cv_data, format_cv_for_prompt
from app.chatbot import extract_suggestions, is_turkish_text

client = TestClient(app)

def test_load_cv_data():
    """Verify that cv_data.json loads with all required real sections."""
    data = load_cv_data()
    assert "personal" in data
    assert data["personal"]["name"] == "Pınar Hale Kara"
    assert "skills" in data
    assert "experience" in data
    assert "education" in data
    assert "projects" in data
    assert "achievements" in data
    assert "languages" in data
    assert "volunteering" in data

def test_phone_number_privacy():
    """Ensure phone number is completely excluded from CV data for privacy."""
    data = load_cv_data()
    phone = data["personal"].get("phone", "")
    assert not phone or phone == "", "Phone number must not be published!"

def test_format_cv_for_prompt():
    """Verify that CV formatting produces complete prompt context."""
    data = load_cv_data()
    text = format_cv_for_prompt(data)
    assert len(text) > 100
    assert "PINAR HALE KARA" in text
    assert "Boğaziçi University" in text
    assert "Golden Youth Award" in text or "Altın Gençler" in text
    assert "Languages" in text

def test_health_check_endpoint():
    """Verify that GET /api/health responds with 200 OK."""
    response = client.get("/api/health")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["status"] == "healthy"
    assert "has_gemini_key" in json_data
    assert "model" in json_data

def test_get_cv_endpoint():
    """Verify that GET /api/cv returns the CV data."""
    response = client.get("/api/cv")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["personal"]["name"] == "Pınar Hale Kara"
    assert len(json_data["achievements"]) >= 2
    assert len(json_data["languages"]) >= 4

def test_get_suggestions_endpoint():
    """Verify that GET /api/suggestions returns initial prompts."""
    response = client.get("/api/suggestions")
    assert response.status_code == 200
    json_data = response.json()
    assert "suggestions" in json_data
    assert len(json_data["suggestions"]) > 0

def test_turkish_language_detection():
    """Verify Turkish text detection heuristic."""
    assert is_turkish_text("Hangi bölümde okuyorsun?") is True
    assert is_turkish_text("YKS derecen kaç?") is True
    assert is_turkish_text("What is your degree?") is False
    assert is_turkish_text("Tell me about your projects") is False

def test_chat_endpoint_valid_response():
    """Verify that POST /api/chat returns a valid response and suggestions."""
    payload = {
        "message": "What is Pınar's major at Boğaziçi University?",
        "history": []
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    json_data = response.json()
    assert "reply" in json_data
    assert len(json_data["reply"]) > 0
    assert "suggestions" in json_data

def test_chat_endpoint_turkish_query():
    """Verify that POST /api/chat handles Turkish query."""
    payload = {
        "message": "Pınar hangi üniversitede okuyor?",
        "history": []
    }
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    json_data = response.json()
    assert "reply" in json_data
    assert len(json_data["reply"]) > 0
    assert "suggestions" in json_data

def test_chat_endpoint_empty_message():
    """Verify that empty chat message returns 400 Bad Request."""
    response = client.post("/api/chat", json={"message": "   "})
    assert response.status_code == 400
