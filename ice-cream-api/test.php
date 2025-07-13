<?php
// test.php - API testing script
header('Content-Type: application/json');

require 'config.php';

$tests = [];
$errors = [];

// Test 1: Database Connection
try {
    $conn = getDatabaseConnection();
    $tests['database_connection'] = 'PASS';
} catch (Exception $e) {
    $tests['database_connection'] = 'FAIL';
    $errors[] = 'Database connection failed: ' . $e->getMessage();
}

// Test 2: Products Table
if (isset($conn)) {
    try {
        $result = $conn->query("SELECT COUNT(*) as count FROM products");
        $row = $result->fetch_assoc();
        $tests['products_table'] = 'PASS';
        $tests['products_count'] = $row['count'];
    } catch (Exception $e) {
        $tests['products_table'] = 'FAIL';
        $errors[] = 'Products table error: ' . $e->getMessage();
    }
}

// Test 3: Owner Table
if (isset($conn)) {
    try {
        $result = $conn->query("SELECT COUNT(*) as count FROM owner");
        $row = $result->fetch_assoc();
        $tests['owner_table'] = 'PASS';
        $tests['owner_count'] = $row['count'];
    } catch (Exception $e) {
        $tests['owner_table'] = 'FAIL';
        $errors[] = 'Owner table error: ' . $e->getMessage();
    }
}

// Test 4: Upload Directory
$uploadDir = UPLOAD_DIR;
if (is_dir($uploadDir)) {
    $tests['upload_directory'] = 'PASS';
} else {
    $tests['upload_directory'] = 'FAIL';
    $errors[] = 'Upload directory does not exist: ' . $uploadDir;
}

// Test 5: File Permissions
if (is_writable($uploadDir)) {
    $tests['upload_permissions'] = 'PASS';
} else {
    $tests['upload_permissions'] = 'FAIL';
    $errors[] = 'Upload directory is not writable: ' . $uploadDir;
}

// Test 6: PHP Extensions
$required_extensions = ['mysqli', 'json', 'fileinfo'];
foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        $tests['extension_' . $ext] = 'PASS';
    } else {
        $tests['extension_' . $ext] = 'FAIL';
        $errors[] = 'Required PHP extension not loaded: ' . $ext;
    }
}

// Test 7: API Endpoints (if curl is available)
if (function_exists('curl_init')) {
    $base_url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']);

    // Test products endpoint
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $base_url . '/products.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200) {
        $tests['products_api'] = 'PASS';
    } else {
        $tests['products_api'] = 'FAIL';
        $errors[] = 'Products API returned HTTP code: ' . $http_code;
    }

    // Test owner endpoint
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $base_url . '/owner.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200) {
        $tests['owner_api'] = 'PASS';
    } else {
        $tests['owner_api'] = 'FAIL';
        $errors[] = 'Owner API returned HTTP code: ' . $http_code;
    }
} else {
    $tests['curl_available'] = 'FAIL';
    $errors[] = 'cURL extension not available for API testing';
}

// Summary
$total_tests = count($tests);
$passed_tests = count(array_filter($tests, function ($result) {
    return $result === 'PASS';
}));
$failed_tests = $total_tests - $passed_tests;

$summary = [
    'total_tests' => $total_tests,
    'passed_tests' => $passed_tests,
    'failed_tests' => $failed_tests,
    'success_rate' => round(($passed_tests / $total_tests) * 100, 2) . '%'
];

$result = [
    'summary' => $summary,
    'tests' => $tests,
    'errors' => $errors,
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'server_info' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
];

echo json_encode($result, JSON_PRETTY_PRINT);