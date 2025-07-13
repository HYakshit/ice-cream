<?php
// categories.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            // Get unique categories from products table
            $result = $conn->query("SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != '' ORDER BY category");
            $categories = [];
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row['category'];
            }
            echo json_encode($categories);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data || empty($data['category'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Category name is required']);
                exit;
            }

            // Update all products with empty category to the new category
            $stmt = $conn->prepare("UPDATE products SET category = ? WHERE category IS NULL OR category = ''");
            $stmt->bind_param("s", $data['category']);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Category updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update category']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
