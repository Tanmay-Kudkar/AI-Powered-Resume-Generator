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

    private final String openRouterApiUrl = "https://openrouter.ai/api/v1/chat/completions";
    private final String openRouterApiKey;

    public ResumeServiceImpl() {
        // 1. Try environment variable first (Render / prod)
        String key = System.getenv("OPENROUTER_API_KEY");

        // 2. If null, fall back to dotenv (local dev)
        if (key == null) {
            key = ResumeAiBackendApplication.dotenv.get("OPENROUTER_API_KEY");
        }

        this.openRouterApiKey = key;

        log.info("🔑 OPENROUTER_API_KEY loaded, length=" + (key != null ? key.length() : 0));
    }

    private static final Logger log = LoggerFactory.getLogger(ResumeServiceImpl.class);

    @PostConstruct
    public void init() {
        if (openRouterApiKey != null && !openRouterApiKey.isEmpty()) {
            String masked = openRouterApiKey.substring(0, 6) + "..." +
                    openRouterApiKey.substring(openRouterApiKey.length() - 4);
            log.info("🔑 OPENROUTER_API_KEY loaded, length={}, value={}", openRouterApiKey.length(), masked);
        } else {
            log.error("❌ OPENROUTER_API_KEY NOT FOUND! Please set it in .env or embed directly.");
        }
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) {
        String systemPrompt = "You are an expert resume JSON generator. " +
                "Your only function is to convert user descriptions into a single, raw, valid JSON object. " +
                "Adhere strictly to the following rules:\n" +
                "1. Entire response MUST be JSON only. No extra text or markdown.\n" +
                "2. Use double quotes (\") for all keys and strings.\n" +
                "3. Follow this structure exactly: {\"personalInformation\":{\"fullName\":\"\",\"email\":\"\",\"phoneNumber\":\"\"},\"summary\":\"\",\"skills\":[{\"title\":\"\",\"level\":\"\"}],...}";

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "deepseek/deepseek-chat-v3.1:free");

        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", systemPrompt));
        messages.put(new JSONObject().put("role", "user").put("content", userResumeDescription));
        requestBody.put("messages", messages);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openRouterApiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.exchange(openRouterApiUrl, HttpMethod.POST, entity, String.class);
            return parseOpenRouterApiResponse(response.getBody());
        } catch (Exception e) {
            log.error("❌ Error calling OpenRouter API", e);
            return Map.of("error", "Failed to generate resume: " + e.getMessage());
        }
    }

    private Map<String, Object> parseOpenRouterApiResponse(String responseBody) {
        Map<String, Object> jsonResponse = new HashMap<>();
        System.out.println("Raw OpenRouter API response: " + responseBody);

        try {
            JSONObject json = new JSONObject(responseBody);
            JSONArray choices = json.optJSONArray("choices");

            if (choices != null && !choices.isEmpty()) {
                JSONObject choice = choices.getJSONObject(0);
                JSONObject message = choice.optJSONObject("message");

                if (message != null) {
                    String resumeJsonString = message.optString("content");
                    if (resumeJsonString != null && !resumeJsonString.isEmpty()) {
                        // Try to parse content as JSON
                        try {
                            JSONObject resumeJson = new JSONObject(resumeJsonString);
                            jsonResponse.put("resume", resumeJson.toMap());
                        } catch (Exception ex) {
                            // If content is plain text, return it as-is
                            log.warn("⚠️ API returned non-JSON content. Returning as text.");
                            jsonResponse.put("resumeText", resumeJsonString);
                        }
                        return jsonResponse;
                    }
                }
            }

            // If 'choices' missing or empty, check for error message in response
            String errorMessage = json.optString("error", "Unknown error from API");
            jsonResponse.put("error", "Invalid API response: " + errorMessage);

        } catch (Exception e) {
            log.error("❌ Failed to parse OpenRouter API response", e);
            // Return raw response as fallback
            jsonResponse.put("error", "Failed to parse API response. Returning raw text.");
            jsonResponse.put("rawResponse", responseBody);
        }

        return jsonResponse;
    }
}
