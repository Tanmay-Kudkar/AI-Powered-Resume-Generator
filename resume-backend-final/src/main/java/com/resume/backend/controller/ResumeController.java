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

    /**
     * POST /api/v1/resume/generate
     * Body: { "userDescription": "..." }
     * Returns: { "resume": {...} } OR { "error": "..." }
     */
    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(@RequestBody ResumeRequest request) {
        String description = request.userDescription();

        // Validate input
        if (description == null || description.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Description cannot be empty"
            ));
        }

        // Call the service to generate resume
        Map<String, Object> response = resumeService.generateResumeResponse(description);

        // Always return JSON, whether success or error
        return ResponseEntity.ok(response);
    }
}
