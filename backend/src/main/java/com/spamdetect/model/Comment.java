package com.spamdetect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String content;

    private boolean isSpam;

    private boolean flagged;

    private double spamProbability;

    public Comment() {
    }

    public Comment(String content, boolean isSpam, boolean flagged, double spamProbability) {
        this.content = content;
        this.isSpam = isSpam;
        this.flagged = flagged;
        this.spamProbability = spamProbability;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isSpam() {
        return isSpam;
    }

    public void setSpam(boolean spam) {
        isSpam = spam;
    }

    public boolean isFlagged() {
        return flagged;
    }

    public void setFlagged(boolean flagged) {
        this.flagged = flagged;
    }

    public double getSpamProbability() {
        return spamProbability;
    }

    public void setSpamProbability(double spamProbability) {
        this.spamProbability = spamProbability;
    }
}
