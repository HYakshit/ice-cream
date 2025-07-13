<?php
// delete-image.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $image = $params['image'] ?? null;

    if (!$image) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing image parameter']);
        exit;
    }

    // Sanitize the filename to prevent directory traversal
    $filename = basename($image);
    $filePath = __DIR__ . '/uploads/' . $filename;

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo json_encode(['success' => true, 'message' => 'File deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete file']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}