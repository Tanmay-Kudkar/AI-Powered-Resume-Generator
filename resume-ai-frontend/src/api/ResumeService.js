// src/api/ResumeService.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Sends user description to backend and returns the parsed JSON response.
 * Throws an error if the request fails.
 * @param {string} userDescription - The description input from the user
 * @returns {Promise<Object>} - { resume: {...} }
 */
export async function generateResume(userDescription) {
  const response = await fetch(`${API_URL}/api/v1/resume/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userDescription }),
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    // Try to parse error from JSON
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.error || JSON.stringify(errorData));
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }
  }

  // Parse JSON if possible, otherwise return plain text
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    const text = await response.text();
    return { resume: text };
  }
}
