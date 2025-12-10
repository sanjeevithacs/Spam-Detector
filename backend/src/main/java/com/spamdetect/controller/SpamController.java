package com.spamdetect.controller;

import com.spamdetect.model.Comment;
import com.spamdetect.service.SpamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend Vite dev server
public class SpamController {

    private final SpamService spamService;

    public SpamController(SpamService spamService) {
        this.spamService = spamService;
    }

    @PostMapping("/check-spam")
    public ResponseEntity<Map<String, Object>> checkSpam(@RequestBody Map<String, String> payload) {
        String comment = payload.get("comment");
        if (comment == null || comment.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("isSpam", false, "spamProbability", 0.0));
        }
        Comment savedComment = spamService.checkAndSaveComment(comment);
        return ResponseEntity.ok(Map.of(
                "isSpam", savedComment.isSpam(),
                "spamProbability", savedComment.getSpamProbability()
        ));
    }
}
