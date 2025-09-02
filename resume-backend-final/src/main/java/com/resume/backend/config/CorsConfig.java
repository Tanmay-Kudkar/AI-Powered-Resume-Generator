package com.resume.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")  // ✅ Accept any frontend origin
                        .allowedMethods("*")         // ✅ GET, POST, PUT, DELETE, etc.
                        .allowedHeaders("*")         // ✅ Allow all headers
                        .allowCredentials(true);     // ✅ Keep cookies/auth if needed
            }
        };
    }
}
