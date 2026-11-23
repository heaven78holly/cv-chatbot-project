import json
from pathlib import Path
from typing import Any, Dict
from app.config import settings

def load_cv_data(file_path: Path = settings.CV_DATA_PATH) -> Dict[str, Any]:
    """
    Loads and returns the CV data from the JSON file.
    If the file does not exist, returns a minimal fallback dictionary.
    """
    if not file_path.exists():
        return {
            "personal": {
                "name": "Pınar Hale Kara",
                "title": "Management Information Systems Student",
                "about": "CV data file not found."
            },
            "skills": {},
            "experience": [],
            "education": [],
            "projects": [],
            "achievements": [],
            "volunteering": [],
            "languages": [],
            "frequently_asked_questions": []
        }
    
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def format_cv_for_prompt(cv_data: Dict[str, Any]) -> str:
    """
    Formats the JSON CV data into a clear, detailed text representation
    for injection into the LLM system prompt.
    """
    lines = []
    
    # Personal Info
    personal = cv_data.get("personal", {})
    name = personal.get("name", "The candidate")
    lines.append(f"# VERIFIED CV PROFILE OF {name.upper()}")
    if personal.get("title"):
        lines.append(f"Title / Field: {personal['title']}")
    if personal.get("location"):
        lines.append(f"Location: {personal['location']}")
    if personal.get("email"):
        lines.append(f"Email: {personal['email']}")
    if personal.get("linkedin"):
        lines.append(f"LinkedIn: {personal['linkedin']}")
    if personal.get("about"):
        lines.append(f"\n## Summary / Bio\n{personal['about']}")

    # Education
    education = cv_data.get("education", [])
    if education:
        lines.append("\n## Education")
        for edu in education:
            deg = edu.get("degree", "Degree")
            inst = edu.get("institution", "Institution")
            yr = edu.get("graduation_year", "")
            yr_str = f" ({yr})" if yr else ""
            lines.append(f"- **{deg}**, {inst}{yr_str}")
            if edu.get("details"):
                lines.append(f"  Details: {edu['details']}")

    # Achievements & Awards
    achievements = cv_data.get("achievements", [])
    if achievements:
        lines.append("\n## Awards & Honors")
        for ach in achievements:
            title = ach.get("title", "")
            yr = ach.get("year", "")
            desc = ach.get("description", "")
            lines.append(f"- **{title}** ({yr}): {desc}")

    # Projects
    projects = cv_data.get("projects", [])
    if projects:
        lines.append("\n## Projects")
        for proj in projects:
            title = proj.get("title", "Project")
            tech = ", ".join(proj.get("tech_stack", []))
            desc = proj.get("description", "")
            lines.append(f"\n### {title}")
            if tech:
                lines.append(f"Tech Stack / Focus: {tech}")
            if desc:
                lines.append(f"Description: {desc}")

    # Experience (Organizational & Leadership)
    experiences = cv_data.get("experience", [])
    if experiences:
        lines.append("\n## Organizational & Extracurricular Experience")
        for exp in experiences:
            role = exp.get("role", "Role")
            org = exp.get("organization", "Organization")
            start = exp.get("start_date", "")
            end = exp.get("end_date", "")
            loc = exp.get("location", "")
            loc_str = f" ({loc})" if loc else ""
            lines.append(f"\n### {role} at {org}{loc_str}")
            lines.append(f"Duration: {start} – {end}")
            descriptions = exp.get("description", [])
            for desc in descriptions:
                lines.append(f"- {desc}")

    # Volunteering
    volunteering = cv_data.get("volunteering", [])
    if volunteering:
        lines.append("\n## Volunteering Experience")
        for vol in volunteering:
            role = vol.get("role", "Volunteer")
            org = vol.get("organization", "Organization")
            lines.append(f"- **{role}** at {org}")
            for desc in vol.get("description", []):
                lines.append(f"  {desc}")

    # Skills
    skills = cv_data.get("skills", {})
    if skills:
        lines.append("\n## Skills & Competencies")
        for category, items in skills.items():
            cat_name = category.replace("_", " ").title()
            items_str = ", ".join(items) if isinstance(items, list) else str(items)
            lines.append(f"- **{cat_name}**: {items_str}")

    # Languages
    languages = cv_data.get("languages", [])
    if languages:
        lines.append("\n## Languages")
        for lang in languages:
            name_l = lang.get("language", "")
            prof = lang.get("proficiency", "")
            lines.append(f"- **{name_l}**: {prof}")

    # FAQs
    faqs = cv_data.get("frequently_asked_questions", [])
    if faqs:
        lines.append("\n## Quick Facts & Answers")
        for faq in faqs:
            q = faq.get("question", "")
            a = faq.get("answer", "")
            lines.append(f"- **Q: {q}**\n  A: {a}")
            
    return "\n".join(lines)
