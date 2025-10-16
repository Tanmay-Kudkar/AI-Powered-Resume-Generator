package com.resume.backend.service;

import com.resume.backend.ResumeAiBackendApplication;
import jakarta.annotation.PostConstruct;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    // Gemini 2.0 Flash API endpoint
    private final String geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    private final String geminiApiKey;

    private static final Logger log = LoggerFactory.getLogger(ResumeServiceImpl.class);

    public ResumeServiceImpl() {
        // Load Gemini API key from env or .env file
        String key = System.getenv("GEMINI_API_KEY");
        if (key == null) {
            key = ResumeAiBackendApplication.dotenv.get("GEMINI_API_KEY");
        }
        this.geminiApiKey = key;
        log.info("🔑 GEMINI_API_KEY loaded, length=" + (key != null ? key.length() : 0));
    }

    @PostConstruct
    public void init() {
        if (geminiApiKey != null && !geminiApiKey.isEmpty()) {
            String masked = geminiApiKey.substring(0, 6) + "..." + geminiApiKey.substring(geminiApiKey.length() - 4);
            log.info("🔑 GEMINI_API_KEY is set, length={}, value={}", geminiApiKey.length(), masked);
        } else {
            log.error("GEMINI_API_KEY NOT FOUND! Please set it in environment variables or .env.");
        }
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) {
        // Check for missing Gemini API key
        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            log.error("GEMINI_API_KEY NOT FOUND! Cannot generate resume.");
            return Map.of("error", "Gemini API key is missing on the server. Please contact the administrator.");
        }

        // Guidence for the Gemini to create a valid JSON resume
        String prompt = "You are an expert resume JSON generator. " +
                "Your only function is to convert user descriptions into a single, valid JSON object. " +
                "Strict rules:\n" +
                "1. Entire response MUST be JSON only.\n" +
                "2. Use double quotes (\") for all keys and strings.\n" +
                "3. Follow this exact structure: {\"personalInformation\": {...}, \"summary\": \"\", \"skills\": [...], ...}" +
                "\nUser description: " + userResumeDescription;


        // Preparation of request body
        JSONObject requestBody = new JSONObject();
        JSONArray contents = new JSONArray();
        JSONObject contentItem = new JSONObject();
        JSONArray parts = new JSONArray();
        JSONObject part = new JSONObject();
        part.put("text", prompt);
        parts.put(part);
        contentItem.put("parts", parts);
        contents.put(contentItem);
        requestBody.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("X-goog-api-key", geminiApiKey); // Gemini expects API key here

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Calling Gemini API
            ResponseEntity<String> response = restTemplate.exchange(geminiApiUrl, HttpMethod.POST, entity, String.class);
            // Parsing Gemini response
            return parseGeminiContentResponse(response.getBody());
        } catch (Exception e) {
            log.error("Error calling Gemini API", e);
            return Map.of("error", "Failed to generate resume: " + e.getMessage());
        }
    }

    private Map<String, Object> parseGeminiContentResponse(String responseBody) {
        Map<String, Object> result = new HashMap<>();
        System.out.println("Raw Gemini API response: " + responseBody);

        try {
            JSONObject json = new JSONObject(responseBody);
            JSONArray candidates = json.optJSONArray("candidates");

            if (candidates != null && candidates.length() > 0) {
                JSONObject candidate = candidates.getJSONObject(0);
                JSONObject content = candidate.getJSONObject("content");
                JSONArray parts = content.getJSONArray("parts");

                // Extract text from first part
                String text = parts.getJSONObject(0).getString("text");

                // Remove code errors in json
                text = text.replaceAll("```json", "").replaceAll("```", "").trim();

                try {
                    // Convert cleaned text to JSON
                    JSONObject resumeJson = new JSONObject(text);
                    result.put("resume", resumeJson.toMap());
                } catch (Exception ex) {
                    
                    // If text is not valid JSON throw error

                    log.warn("Gemini API returned text that is not JSON. Returning raw text.");
                    result.put("resumeText", text);
                }

                return result;
            }

            // If no candidates or parts found, return error
            String errorMessage = json.optString("error", "Unknown error from API");
            result.put("error", "Invalid API response: " + errorMessage);

        } catch (Exception e) {
            log.error("Failed to parse Gemini API response", e);
            result.put("error", "Failed to parse API response. Returning raw text.");
            result.put("rawResponse", responseBody);
        }

        return result;
    }
}
