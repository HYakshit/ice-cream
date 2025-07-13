<?php
// upload.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file provided']);
        exit;
    }

    $file = $_FILES['image'];

    // Validate file upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'File upload error: ' . $file['error']]);
        exit;
    }

    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed']);
        exit;
    }

    // Validate file size (5MB max)
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
        exit;
    }

    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        if (!mkdir($targetDir, 0755, true)) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create upload directory']);
            exit;
        }
    }

    // Generate unique filename to prevent conflicts
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $extension;
    $targetFile = $targetDir . $filename;

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        echo json_encode([
            'success' => true,
            'url' => '/ice-cream-api/uploads/' . $filename,
            'filename' => $filename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload image']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
