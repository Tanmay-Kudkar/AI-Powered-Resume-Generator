package com.resume.backend.controller;

import com.resume.backend.ResumeRequest;
import com.resume.backend.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(@RequestBody ResumeRequest request) {
        String description = request.userDescription();

        // Validate input
        if (description == null || description.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Description cannot be empty"
            ));
        }

        // Calling the Service to Generate Resume
        Map<String, Object> response = resumeService.generateResumeResponse(description);

        // To Always return JSON whether it can be a success or error
        return ResponseEntity.ok(response);
    }
}
