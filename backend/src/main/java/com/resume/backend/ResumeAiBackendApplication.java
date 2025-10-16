package com.resume.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ResumeAiBackendApplication {

    // Global Dotenv access to .env files
    public static Dotenv dotenv;

    public static void main(String[] args) {
        // Load .env file from backend folder
        dotenv = Dotenv.configure()
                .directory("./backend")      // Search .env in backend folder
                .ignoreIfMissing()           // To avoid crash if .env file is missing
                .load();

        // Load Gemini API key
        String apiKey = System.getenv("GEMINI_API_KEY");   // first check environment
        if (apiKey == null) {
            apiKey = dotenv.get("GEMINI_API_KEY");     // then check directory .env file
        }

        // The Status of the API key Loading while starting the application
        if (apiKey != null && !apiKey.isEmpty()) {
            String masked = apiKey.substring(0, 6) + "..." +
                    apiKey.substring(apiKey.length() - 4);
            System.out.println("🔑 GEMINI_API_KEY loaded, length=" + apiKey.length() + ", value=" + masked);
        } else {
            System.err.println("❌ GEMINI_API_KEY NOT FOUND! Please set it in .env or environment variables.");
        }

        SpringApplication.run(ResumeAiBackendApplication.class, args);
    }
}
