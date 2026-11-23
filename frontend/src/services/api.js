/**
 * API Service for connecting to the FastAPI backend
 */

const API_BASE = '/api';

export async function fetchCVData() {
  const res = await fetch(`${API_BASE}/cv`);
  if (!res.ok) {
    throw new Error(`Failed to load CV data: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', has_gemini_key: false };
    return res.json();
  } catch (err) {
    return { status: 'offline', has_gemini_key: false };
  }
}

export async function fetchSuggestions() {
  try {
    const res = await fetch(`${API_BASE}/suggestions`);
    if (!res.ok) return { suggestions: [] };
    return res.json();
  } catch (err) {
    return { suggestions: [] };
  }
}

export async function sendChatMessage(message, history = []) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status})`);
  }

  return res.json();
}
