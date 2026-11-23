import os
from pathlib import Path
from dotenv import load_dotenv

# Base paths
BASE_DIR = Path(__file__).resolve().parent.parent
# Load .env file if present
load_dotenv(BASE_DIR / ".env")

class Settings:
    # Security: Read securely from environment variable only
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite").strip()
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Path to CV data file
    CV_DATA_PATH: Path = BASE_DIR / "data" / "cv_data.json"
    
    # Path to compiled frontend for single-service deployment
    FRONTEND_DIST: Path = BASE_DIR.parent / "frontend" / "dist"
    
    @property
    def has_gemini_key(self) -> bool:
        return bool(self.GEMINI_API_KEY and self.GEMINI_API_KEY != "your_gemini_api_key_here")

settings = Settings()
