package com.resume.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ResumeAiBackendApplication {

    // Global Dotenv instance to access environment variables anywhere
    public static Dotenv dotenv;

    public static void main(String[] args) {
        // Load .env file from project root (resume-backend-final/.env)
        dotenv = Dotenv.configure()
                .directory("./")      // project root
                .ignoreIfMissing()    // optional: avoid crash if file missing
                .load();

        // Load Gemini API key
        String apiKey = System.getenv("GEMINI_API_KEY");       // first check environment
        if (apiKey == null) {
            apiKey = dotenv.get("GEMINI_API_KEY");            // fallback to .env
        }

        if (apiKey != null && !apiKey.isEmpty()) {
            // Masked logging for safety
            String masked = apiKey.substring(0, 6) + "..." +
                    apiKey.substring(apiKey.length() - 4);
            System.out.println("🔑 GEMINI_API_KEY loaded, length=" + apiKey.length() + ", value=" + masked);
        } else {
            System.err.println("❌ GEMINI_API_KEY NOT FOUND! Please set it in .env or environment variables.");
        }

        SpringApplication.run(ResumeAiBackendApplication.class, args);
    }
}
