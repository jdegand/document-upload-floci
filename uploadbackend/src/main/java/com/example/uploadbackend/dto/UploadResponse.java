package com.example.uploadbackend.dto;

public record UploadResponse(
        String documentId,
        String title,
        String department,
        String s3Key,
        String uploadedAt) {
}
