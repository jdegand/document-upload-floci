package com.example.uploadbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.uploadbackend.dto.UploadResponse;
import com.example.uploadbackend.service.S3UploadService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    private final S3UploadService uploadService;

    @PostMapping
    public ResponseEntity<UploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("department") String department) {
        UploadResponse response = uploadService.uploadDocument(file, title, department);
        return ResponseEntity.ok(response);
    }
}
