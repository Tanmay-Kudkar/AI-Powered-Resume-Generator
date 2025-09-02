// src/api/ResumeService.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Send user description to backend and return the parsed JSON response.
 * Returns an object: { resume: {...} } or { error: "..." }
 */
export async function generateResume(userDescription) {
  try {
    const res = await fetch(`${API_URL}/api/v1/resume/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDescription }),
    });

    // If backend returns non-2xx, try to parse the body for error info
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // backend may return plain text; return that as an error
      if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
      // if ok and not JSON, return raw text in resume field
      return { resume: text };
    }

    if (!res.ok) {
      // server responded 4xx/5xx with JSON payload
      return { error: data.error || JSON.stringify(data) };
    }

    // success: expected { resume: {...} }
    return data;
  } catch (err) {
    console.error("generateResume error:", err);
    return { error: err.message || "Unknown error" };
  }
}
