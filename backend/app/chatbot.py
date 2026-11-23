import os
import re
from typing import List, Dict, Any, Tuple
from app.config import settings
from app.cv_loader import load_cv_data, format_cv_for_prompt

# Default suggestions when starting
DEFAULT_SUGGESTIONS_EN = [
    "What is Pınar's educational background?",
    "Tell me about her YKS ranking and awards",
    "What languages does Pınar speak?",
    "What are her core career interests?"
]

DEFAULT_SUGGESTIONS_TR = [
    "Pınar hangi bölümde okuyor?",
    "YKS derecesi ve ödülleri nelerdir?",
    "Hangi dilleri biliyor?",
    "İlgi duyduğu alanlar nelerdir?"
]

DEFAULT_SUGGESTIONS = DEFAULT_SUGGESTIONS_EN

def build_system_instruction(cv_text: str, candidate_name: str, contact_email: str, linkedin_url: str) -> str:
    """
    Constructs the system prompt that strictly grounds the model in the provided CV data,
    enforcing bilingual mirroring (Turkish or English) and zero hallucination.
    """
    return f"""You are the official AI representative and portfolio assistant for {candidate_name}.
Your mission is to answer questions from recruiters, hiring managers, professors, and visitors about {candidate_name}'s education, achievements, projects, organizational experience, volunteering, skills, and languages.

=== VERIFIED CANDIDATE CV DATA ===
{cv_text}
==================================

CORE RULES:
1. BILINGUAL LANGUAGE MATCHING (CRITICAL):
   - You must ALWAYS answer in the EXACT SAME language as the visitor's question.
   - If the visitor asks in Turkish (e.g. "Hangi üniversitede okuyorsun?", "YKS derecen nedir?", "Hangi dilleri biliyorsun?"), respond fluently, professionally, and naturally in Turkish.
   - If the visitor asks in English, respond in professional English.

2. STRICT FACTUAL GROUNDING & ZERO FABRICATION:
   - Base every single fact STRICTLY and EXCLUSIVELY on the CV data above.
   - Never invent, assume, or extrapolate any qualifications, GPA, companies, or skills.
   - Do NOT treat placeholders as achievements.

3. PRIVACY & CONTACT:
   - Do NOT share or invent any personal phone number. 
   - State that the best ways to contact {candidate_name} are via email at {contact_email} or LinkedIn at {linkedin_url}.

4. UNLISTED INQUIRIES:
   - If a visitor asks about a skill, qualification, or experience not mentioned in the CV:
     - In English: "That information is not mentioned in {candidate_name}'s CV. For more details, please feel free to reach out directly via email at {contact_email} or LinkedIn."
     - In Turkish: "Bu bilgi {candidate_name}'nın özgeçmişinde yer almamaktadır. Detaylı bilgi için doğrudan {contact_email} e-posta adresi veya LinkedIn üzerinden iletişime geçebilirsiniz."

5. TONE: Professional, articulate, warm, and modest yet confident. Use clean markdown formatting (bullet points, bold highlights).

6. SUGGESTED FOLLOW-UP QUESTIONS:
   - At the very end of your response, on a new line, always provide 2 relevant follow-up questions in the SAME language as your answer, using this exact format:
     SUGGESTED_QUESTIONS: [Question 1] | [Question 2]
"""

def extract_suggestions(response_text: str, is_turkish: bool = False) -> Tuple[str, List[str]]:
    """
    Extracts the SUGGESTED_QUESTIONS line from the response text
    and returns (clean_response_text, suggestions_list).
    """
    pattern = r"SUGGESTED_QUESTIONS:\s*(.*)$"
    match = re.search(pattern, response_text, re.IGNORECASE | re.MULTILINE)
    
    if match:
        clean_text = re.sub(pattern, "", response_text, flags=re.IGNORECASE | re.MULTILINE).strip()
        raw_suggestions = match.group(1).strip()
        suggestions = [s.strip().strip("[]'\"") for s in raw_suggestions.split("|") if s.strip()]
        return clean_text, suggestions[:3]
    
    fallback = DEFAULT_SUGGESTIONS_TR[:3] if is_turkish else DEFAULT_SUGGESTIONS_EN[:3]
    return response_text.strip(), fallback

def is_turkish_text(text: str) -> bool:
    """Simple heuristic to detect Turkish in query."""
    turkish_chars = set("çğıöşüÇĞİÖŞÜ")
    if any(char in turkish_chars for char in text):
        return True
    turkish_words = {"ve", "ile", "nedir", "nelerdir", "hangi", "nerede", "okuyor", "bölüm", "derecesi", "hakkında", "merhaba", "selam"}
    words = set(re.findall(r'\b\w+\b', text.lower()))
    return len(words.intersection(turkish_words)) > 0

def get_chat_response(message: str, history: List[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Processes a chat message using Google Gemini with language mirroring and model fallback.
    """
    cv_data = load_cv_data()
    personal = cv_data.get("personal", {})
    candidate_name = personal.get("name", "Pınar Hale Kara")
    contact_email = personal.get("email", "phalekara@gmail.com")
    linkedin_url = personal.get("linkedin", "https://linkedin.com/in/pınar-hale-kara-642831322")
    cv_text = format_cv_for_prompt(cv_data)
    is_tr = is_turkish_text(message)

    # 1. Fallback if GEMINI_API_KEY is not set
    if not settings.has_gemini_key:
        if is_tr:
            fallback_msg = (
                f"Merhaba! Ben {candidate_name}'nın yapay zekâ asistanıyım.\n\n"
                "⚠️ **Bilgi**: Google Gemini API anahtarı henüz `backend/.env` dosyasına girilmedi."
            )
            return {"reply": fallback_msg, "suggestions": DEFAULT_SUGGESTIONS_TR}
        else:
            fallback_msg = (
                f"Hello! I am {candidate_name}'s AI assistant.\n\n"
                "⚠️ **Notice**: Google Gemini API key is not yet configured in `backend/.env`."
            )
            return {"reply": fallback_msg, "suggestions": DEFAULT_SUGGESTIONS_EN}

    # 2. Call Google Gemini via official google-genai SDK
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        system_instruction = build_system_instruction(cv_text, candidate_name, contact_email, linkedin_url)

        # Format conversation history
        contents = []
        if history:
            for item in history[-6:]:
                role = "user" if item.get("role") == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part.from_text(text=item.get("content", ""))]
                    )
                )

        # Append current user message
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=message)]
            )
        )

        # Candidate models to try in order: configured model first, then verified working flash models
        candidate_models = [settings.GEMINI_MODEL]
        for fallback in ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.8-flash", "gemini-3.6-flash"]:
            if fallback not in candidate_models:
                candidate_models.append(fallback)

        response = None
        last_err = None
        for model_name in candidate_models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=0.2,
                        max_output_tokens=800,
                    )
                )
                if response and response.text:
                    break
            except Exception as err:
                last_err = err
                continue

        if not response or not response.text:
            raise last_err or Exception("Failed to generate response from Gemini.")

        clean_reply, suggestions = extract_suggestions(response.text, is_turkish=is_tr)

        return {
            "reply": clean_reply,
            "suggestions": suggestions if suggestions else (DEFAULT_SUGGESTIONS_TR if is_tr else DEFAULT_SUGGESTIONS_EN)
        }

    except Exception as e:
        error_msg = str(e)
        if is_tr:
            return {
                "reply": f"Google Gemini bağlantısında bir sorun oluştu: {error_msg}.",
                "suggestions": DEFAULT_SUGGESTIONS_TR
            }
        return {
            "reply": f"I encountered an error connecting to Google Gemini: {error_msg}.",
            "suggestions": DEFAULT_SUGGESTIONS_EN
        }
