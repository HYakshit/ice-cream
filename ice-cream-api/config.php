<?php
// config.php - Configuration settings for the ice cream API

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'icecream');

// API configuration
define('API_VERSION', '1.0.0');
define('UPLOAD_MAX_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
]);

// CORS settings
define('ALLOWED_ORIGINS', ['*']); // In production, specify actual domains
define('ALLOWED_METHODS', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
define('ALLOWED_HEADERS', ['Content-Type', 'Authorization']);

// Error reporting (set to false in production)
define('DEBUG_MODE', true);

// File upload settings
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL_PREFIX', '/ice-cream-api/uploads/');

// Helper functions
function getDatabaseConnection()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    return $conn;
}

function setCorsHeaders()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: " . implode(', ', ALLOWED_HEADERS));
    header("Access-Control-Allow-Methods: " . implode(', ', ALLOWED_METHODS));
    header('Content-Type: application/json');
}

function handlePreflight()
{
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function validateImageFile($file)
{
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('File upload error: ' . ($file['error'] ?? 'No file provided'));
    }

    if (!in_array($file['type'], ALLOWED_IMAGE_TYPES)) {
        throw new Exception('Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed');
    }

    if ($file['size'] > UPLOAD_MAX_SIZE) {
        throw new Exception('File too large. Maximum size is ' . (UPLOAD_MAX_SIZE / 1024 / 1024) . 'MB');
    }
}

function generateUniqueFilename($originalName)
{
    $extension = pathinfo($originalName, PATHINFO_EXTENSION);
    return uniqid() . '_' . time() . '.' . $extension;
}

function sanitizeInput($data)
{
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function logError($message, $context = [])
{
    if (DEBUG_MODE) {
        error_log("API Error: " . $message . " Context: " . json_encode($context));
    }
}
