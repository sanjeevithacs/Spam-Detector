package com.spamdetect.service;

import com.spamdetect.model.Comment;
import com.spamdetect.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SpamService {

    private final CommentRepository commentRepository;

    private final List<String> spamKeywords = Arrays.asList(
            "buy now", "free", "click here", "subscribe", "visit", "winner", "prize" , "exciting",
            "limited time", "urgent", "act now", "risk-free", "guarantee", "no cost", "100% free"
    );

    public SpamService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public boolean isSpam(String content) {
        if (content == null) return false;
        String lowerContent = content.toLowerCase();
        return spamKeywords.stream().anyMatch(lowerContent::contains);
    }

    public double calculateSpamProbability(String content) {
        if (content == null || content.trim().isEmpty()) {
            return 0.0;
        }
        String lowerContent = content.toLowerCase();

        if (spamKeywords.isEmpty()) {
            return 0.0;
        }

        long count = spamKeywords.stream().filter(lowerContent::contains).count();

        double probability = (double) count / spamKeywords.size();

        if (probability < 0) probability = 0.0;
        else if (probability > 1) probability = 1.0;

        return probability;
    }

    public Comment checkAndSaveComment(String content) {
        boolean spam = isSpam(content);
        boolean flagged = spam; // For now, flagged if spam
        double spamProbability = calculateSpamProbability(content);
        Comment comment = new Comment(content, spam, flagged, spamProbability);
        return commentRepository.save(comment);
    }
}
