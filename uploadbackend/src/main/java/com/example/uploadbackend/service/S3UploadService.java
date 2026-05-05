package com.example.uploadbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.uploadbackend.dto.UploadResponse;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final S3Client s3Client;

    private final String bucketName = "hr-policy-docs";

    public UploadResponse uploadDocument(MultipartFile file, String title, String department) {
        try {
            String documentId = UUID.randomUUID().toString();
            String s3Key = "documents/" + documentId + "/" + file.getOriginalFilename();

            PutObjectRequest putReq = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putReq, RequestBody.fromBytes(file.getBytes()));

            return new UploadResponse(
                    documentId,
                    title,
                    department,
                    s3Key,
                    Instant.now().toString());

        } catch (Exception e) {
            throw new RuntimeException("Upload failed", e);
        }
    }
}
