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
                .directory("./") // project root
                .ignoreIfMissing() // optional: avoid crash if file missing
                .load();

        String apiKey = dotenv.get("OPENROUTER_API_KEY");
        if (apiKey != null) {
            System.out.println("🔑 OPENROUTER_API_KEY loaded, length=" + apiKey.length());
        } else {
            System.err.println("❌ OPENROUTER_API_KEY NOT FOUND in .env!");
        }

        SpringApplication.run(ResumeAiBackendApplication.class, args);
    }
}
