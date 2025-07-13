<?php
// setup.php - Database setup script
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$password = '';
$db = 'icecream';

// Create connection
$conn = new mysqli($host, $user, $password);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $db";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists\n";
} else {
    http_response_code(500);
    die(json_encode(['error' => 'Error creating database: ' . $conn->error]));
}

// Select the database
$conn->select_db($db);

// Create products table
$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    quantity VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Products table created successfully\n";
} else {
    http_response_code(500);
    die(json_encode(['error' => 'Error creating products table: ' . $conn->error]));
}

// Create owner table
$sql = "CREATE TABLE IF NOT EXISTS owner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    mobile VARCHAR(50),
    gmap TEXT,
    address TEXT,
    shopname VARCHAR(255),
    whatsapp TEXT,
    instagram TEXT,
    facebook TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Owner table created successfully\n";
} else {
    http_response_code(500);
    die(json_encode(['error' => 'Error creating owner table: ' . $conn->error]));
}

// Insert default owner data if table is empty
$result = $conn->query("SELECT COUNT(*) as count FROM owner");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sql = "INSERT INTO owner (name, email, mobile, gmap, address, shopname, whatsapp, instagram, facebook) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $name = "MINI Fruit cream";
    $email = "minisfruitcream@gmail.com";
    $mobile = "+91 78887 96675";
    $gmap = "https://maps.app.goo.gl/mBRWcqfkSXENoHWJ8";
    $address = "Kot Khalsa near railway station, Amritsar, India, Punjab region";
    $shopname = "MINI Fruit cream";
    $whatsapp = "https://api.whatsapp.com/send?phone=917888796675&text=Hi%20there!%20I%20want%20to%20order%20an%20ice%20cream.%20Please%20let%20me%20know%20the%20available%20flavours.";
    $instagram = "https://www.instagram.com/minisfruitcream/";
    $facebook = "https://www.facebook.com/profile.php?id=61564018252348";

    $stmt->bind_param("sssssssss", $name, $email, $mobile, $gmap, $address, $shopname, $whatsapp, $instagram, $facebook);

    if ($stmt->execute()) {
        echo "Default owner data inserted successfully\n";
    } else {
        echo "Error inserting default owner data: " . $stmt->error . "\n";
    }
}

// Insert sample products if table is empty
$result = $conn->query("SELECT COUNT(*) as count FROM products");
$row = $result->fetch_assoc();

if ($row['count'] == 0) {
    $sampleProducts = [
        ['Blue Curacao Mojito', 'Cool, vibrant, and tropical blue refreshment.', 80.00, 'Blue Curacao Mojito.jpg', 'Mojito Flavoured Drink', 'Blue Curacao Mojito', null],
        ['Butter Scotch Shakes', 'Rich, creamy butterscotch in every sip.', 80.00, 'Butter Scotch Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Choclate Shakes', 'Pure indulgence in every chocolate swirl.', 80.00, 'Choclate Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Cold Coffee', 'Chilled caffeine to beat the heat.', 60.00, 'Cold Coffee.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Fruit cream 125 grms', 'A mini bowl of fruity delight.', 80.00, 'Fruit cream 125 grms.jpg', 'Fruit cream', '125 grms', null],
        ['Fruit cream 250 grms', 'A satisfying scoop of sweet and juicy fruits.', 150.00, 'Fruit cream 250 grms.jpg', 'Fruit cream', '250 grms', null],
        ['Fruit cream 500 grms', 'A bestseller filled with fruit and cream bliss.', 280.00, 'Fruit cream 500 grms.jpg', 'Fruit cream', '500 grms', 5.0],
        ['Fruit cream 1000 grms', 'Enough creamy fruit for the whole family.', 540.00, 'Fruit cream 1000 grms.jpg', 'Fruit cream', '1000 grms', null],
        ['Green Apple Mojito', 'Tangy apple meets cool mint in a fizzy blend.', 80.00, 'Green Apple Mojito.jpg', 'Mojito Flavoured Drink', 'Green Apple Mojito', null],
        ['Kit Kat Shakes', 'Crunchy Kit Kat meets creamy goodness.', 80.00, 'Kit Kat Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Mango Shakes', 'Sweet mango blended to smooth perfection.', 80.00, 'Mango Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Mint Mojito', 'A zesty mint blast in every sip.', 80.00, 'Mint Mojito.jpg', 'Mojito Flavoured Drink', 'Mint Mojito', null],
        ['Oreo Shakes', 'Crunchy Oreos blended into creamy delight.', 80.00, 'Oreo Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Strawberry Shakes', 'Fresh strawberries swirled in cream.', 70.00, 'Strawberry Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Vanila Shakes', 'Smooth, classic vanilla to calm your soul.', 60.00, 'Vanila Shakes.jpg', 'Flavoured Shakes with Ice Cream', '-', null],
        ['Water Melon Mojito', 'Cool watermelon meets fizzy minty vibes.', 80.00, 'Water Melon Mojito.jpg', 'Mojito Flavoured Drink', 'Water Melon Mojito', null]
    ];

    $sql = "INSERT INTO products (name, description, price, image_url, category, quantity, rating) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    foreach ($sampleProducts as $product) {
        $stmt->bind_param("ssdsssd", $product[0], $product[1], $product[2], $product[3], $product[4], $product[5], $product[6]);
        $stmt->execute();
    }

    echo "Sample products inserted successfully\n";
}

$conn->close();

echo json_encode(['success' => true, 'message' => 'Database setup completed successfully']);