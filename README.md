# Document Upload Floci

A document (`.pdf`, `.doc`, `.docx`) upload service using Floci (AWS emulator) and S3-compatible storage. The Angular frontend uses a signal-based form to upload documents to a Spring Boot backend.

## Prerequisites

- Java 25+ and Maven
- Node.js and npm
- Docker and Docker Compose
- AWS CLI (optional, for manual bucket management)

## Getting Started

1. Configure Environment Variables

Create a `.env` file in the project root directory:

```bash
FLOCI_AUTH_PRESIGN_SECRET=your_secret_key_here
```

2. Start the Infrastructure

Spin up the Floci S3 emulator using Docker Compose:

```bash
cd document-upload-floci
sudo docker compose up -d
```

3. Start the Backend

Launch the Spring Boot application:

```bash
cd uploadbackend
mvn spring-boot:run
```

Or run from your IDE.

4. Start the Frontend

Install dependencies and start the Angular development server:

```bash
cd uploadfrontend
npm install
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:4200`.
1. Fill out the signal-based upload form and submit your document.
1. Verify the file is saved in the local bucket by visiting:

```bash
http://localhost:4566/hr-policy-docs/
```

Add the key to the URL to view the uploaded file's contents.

## Configuration Alternatives

### Skip AWS CLI in Docker

If you have the AWS CLI installed locally, you can remove it from the Docker container and manually create the bucket:

```bash
aws --endpoint-url=http://localhost:4566 s3 mb s3://hr-policy-docs
```

### Automate Bucket Creation

To eliminate manual setup, initialize the bucket automatically inside the Spring Boot application using a CommandLineRunner bean:

```java
@Bean
CommandLineRunner initBucket(S3Client s3Client) {
    return args -> {
        try {
            s3Client.createBucket(b -> b.bucket("hr-policy-docs"));
        } catch (S3Exception e) {
            // Bucket may already exist
        }
    };
}
```
