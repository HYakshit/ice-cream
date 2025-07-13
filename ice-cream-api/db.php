<?php
// db.php
$host = 'localhost';
$user = 'root';
$password = '';
$db = 'icecream';

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed']));
}
?>