<?php
// owner.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header('Content-Type: application/json');
// echo ("in owner.php\n"); 
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = $conn->query("SELECT * FROM owner LIMIT 1");
        $owner = $result->fetch_assoc();

        if ($owner) {
            echo json_encode($owner);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Owner data not found']);
        }
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit;
        }

        $stmt = $conn->prepare("UPDATE owner SET name=?, email=?, mobile=?, gmap=?, address=?, shopname=?, whatsapp=?, instagram=?, facebook=? WHERE id=1");
        $stmt->bind_param(
            "sssssssss",
            $data['name'] ?? '',
            $data['email'] ?? '',
            $data['mobile'] ?? '',
            $data['gmap'] ?? '',
            $data['address'] ?? '',
            $data['shopname'] ?? '',
            $data['whatsapp'] ?? '',
            $data['instagram'] ?? '',
            $data['facebook'] ?? ''
        );

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update owner data']);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
