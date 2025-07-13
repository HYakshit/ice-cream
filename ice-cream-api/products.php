<?php
// products.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

// echo ("in products.php\n"); 
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $result = $conn->query("SELECT * FROM products");
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
            echo json_encode($products);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                exit;
            }

            // Validate required fields
            if (empty($data['name']) || !isset($data['price'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Name and price are required']);
                exit;
            }

            $stmt = $conn->prepare("INSERT INTO products (name, description, price, image_url, category, quantity, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param(
                "ssdsssd",
                $data['name'],
                $data['description'] ?? '',
                $data['price'],
                $data['image_url'] ?? null,
                $data['category'] ?? '',
                $data['quantity'] ?? '',
                $data['rating'] ?? null
            );

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create product']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        try {
            parse_str($_SERVER['QUERY_STRING'], $params);
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing id parameter']);
                exit;
            }

            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON data']);
                exit;
            }

            $stmt = $conn->prepare("UPDATE products SET name=?, description=?, price=?, image_url=?, category=?, quantity=?, rating=? WHERE id=?");
            $stmt->bind_param(
                "ssdsssdi",
                $data['name'] ?? '',
                $data['description'] ?? '',
                $data['price'] ?? 0,
                $data['image_url'] ?? null,
                $data['category'] ?? '',
                $data['quantity'] ?? '',
                $data['rating'] ?? null,
                $id
            );

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update product']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        try {
            parse_str($_SERVER['QUERY_STRING'], $params);
            $id = $params['id'] ?? null;

            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing id parameter']);
                exit;
            }

            $stmt = $conn->prepare("DELETE FROM products WHERE id=?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete product']);
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