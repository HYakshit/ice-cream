<?php
// admin.php - Admin interface for managing products and owner info
session_start();
require 'config.php';
require 'db.php';

// Simple authentication (in production, use proper authentication)
$admin_password = 'admin123'; // Change this in production

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'login') {
        if ($_POST['password'] === $admin_password) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: admin.php');
            exit;
        } else {
            $error = 'Invalid password';
        }
    } elseif ($_POST['action'] === 'logout') {
        session_destroy();
        header('Location: admin.php');
        exit;
    }
}

$is_logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'];

if (!$is_logged_in) {
    // Show login form
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Ice Cream API</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
    }

    .login-container {
        max-width: 400px;
        margin: 100px auto;
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input[type="password"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        background: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #0056b3;
    }

    .error {
        color: red;
        margin-bottom: 15px;
    }
    </style>
</head>

<body>
    <div class="login-container">
        <h2>Admin Login</h2>
        <?php if (isset($error)): ?>
        <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <form method="POST">
            <input type="hidden" name="action" value="login">
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</body>

</html>
<?php
    exit;
}

// Get products and owner data
$products = [];
$owner = null;

try {
    $result = $conn->query("SELECT * FROM products ORDER BY created_at DESC");
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    $result = $conn->query("SELECT * FROM owner LIMIT 1");
    $owner = $result->fetch_assoc();
} catch (Exception $e) {
    $error = 'Database error: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Ice Cream API</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .section {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .product-card {
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 8px;
    }

    .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        background: #007bff;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
    }

    button:hover {
        background: #0056b3;
    }

    .btn-danger {
        background: #dc3545;
    }

    .btn-danger:hover {
        background: #c82333;
    }

    .btn-success {
        background: #28a745;
    }

    .btn-success:hover {
        background: #218838;
    }

    .error {
        color: red;
        margin-bottom: 15px;
    }

    .success {
        color: green;
        margin-bottom: 15px;
    }

    .tabs {
        display: flex;
        margin-bottom: 20px;
    }

    .tab {
        padding: 10px 20px;
        background: #f8f9fa;
        border: 1px solid #ddd;
        cursor: pointer;
    }

    .tab.active {
        background: #007bff;
        color: white;
    }

    .tab-content {
        display: none;
    }

    .tab-content.active {
        display: block;
    }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Ice Cream API Admin Panel</h1>
            <form method="POST" style="display: inline;">
                <input type="hidden" name="action" value="logout">
                <button type="submit" class="btn-danger">Logout</button>
            </form>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="showTab('products')">Products</div>
            <div class="tab" onclick="showTab('owner')">Owner Info</div>
            <div class="tab" onclick="showTab('add-product')">Add Product</div>
        </div>

        <div id="products" class="tab-content active">
            <div class="section">
                <h2>Products (<?php echo count($products); ?>)</h2>
                <div class="product-grid">
                    <?php foreach ($products as $product): ?>
                    <div class="product-card">
                        <?php if ($product['image_url']): ?>
                        <img src="<?php echo htmlspecialchars($product['image_url']); ?>"
                            alt="<?php echo htmlspecialchars($product['name']); ?>" class="product-image">
                        <?php endif; ?>
                        <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                        <p><strong>Price:</strong> ₹<?php echo number_format($product['price'], 2); ?></p>
                        <p><strong>Category:</strong> <?php echo htmlspecialchars($product['category'] ?? 'N/A'); ?></p>
                        <p><strong>Quantity:</strong> <?php echo htmlspecialchars($product['quantity'] ?? 'N/A'); ?></p>
                        <?php if ($product['rating']): ?>
                        <p><strong>Rating:</strong> <?php echo $product['rating']; ?>/5</p>
                        <?php endif; ?>
                        <p><?php echo htmlspecialchars($product['description']); ?></p>
                        <button onclick="editProduct(<?php echo $product['id']; ?>)">Edit</button>
                        <button class="btn-danger"
                            onclick="deleteProduct(<?php echo $product['id']; ?>)">Delete</button>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div id="owner" class="tab-content">
            <div class="section">
                <h2>Owner Information</h2>
                <?php if ($owner): ?>
                <form id="ownerForm">
                    <div class="form-group">
                        <label for="shopname">Shop Name:</label>
                        <input type="text" id="shopname" name="shopname"
                            value="<?php echo htmlspecialchars($owner['shopname'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="name">Owner Name:</label>
                        <input type="text" id="name" name="name"
                            value="<?php echo htmlspecialchars($owner['name'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email"
                            value="<?php echo htmlspecialchars($owner['email'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile:</label>
                        <input type="text" id="mobile" name="mobile"
                            value="<?php echo htmlspecialchars($owner['mobile'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <textarea id="address" name="address"
                            rows="3"><?php echo htmlspecialchars($owner['address'] ?? ''); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label for="gmap">Google Maps URL:</label>
                        <input type="url" id="gmap" name="gmap"
                            value="<?php echo htmlspecialchars($owner['gmap'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="whatsapp">WhatsApp URL:</label>
                        <input type="url" id="whatsapp" name="whatsapp"
                            value="<?php echo htmlspecialchars($owner['whatsapp'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="instagram">Instagram URL:</label>
                        <input type="url" id="instagram" name="instagram"
                            value="<?php echo htmlspecialchars($owner['instagram'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="facebook">Facebook URL:</label>
                        <input type="url" id="facebook" name="facebook"
                            value="<?php echo htmlspecialchars($owner['facebook'] ?? ''); ?>">
                    </div>
                    <button type="submit" class="btn-success">Update Owner Info</button>
                </form>
                <?php else: ?>
                <p>No owner information found.</p>
                <?php endif; ?>
            </div>
        </div>

        <div id="add-product" class="tab-content">
            <div class="section">
                <h2>Add New Product</h2>
                <form id="addProductForm">
                    <div class="form-group">
                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="productDescription">Description:</label>
                        <textarea id="productDescription" name="description" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="productPrice">Price (₹):</label>
                        <input type="number" id="productPrice" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="productCategory">Category:</label>
                        <input type="text" id="productCategory" name="category">
                    </div>
                    <div class="form-group">
                        <label for="productQuantity">Quantity:</label>
                        <input type="text" id="productQuantity" name="quantity">
                    </div>
                    <div class="form-group">
                        <label for="productRating">Rating (1-5):</label>
                        <input type="number" id="productRating" name="rating" min="1" max="5" step="0.1">
                    </div>
                    <div class="form-group">
                        <label for="productImage">Image URL:</label>
                        <input type="url" id="productImage" name="image_url">
                    </div>
                    <button type="submit" class="btn-success">Add Product</button>
                </form>
            </div>
        </div>
    </div>

    <script>
    function showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        document.getElementById(tabName).classList.add('active');

        // Add active class to clicked tab
        event.target.classList.add('active');
    }

    // Owner form submission
    document.getElementById('ownerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('owner.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Owner information updated successfully!');
            } else {
                alert('Error updating owner information');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Add product form submission
    document.getElementById('addProductForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('products.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Product added successfully!');
                e.target.reset();
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    function editProduct(id) {
        // Implement edit functionality
        alert('Edit functionality for product ID: ' + id);
    }

    function deleteProduct(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            fetch(`products.php?id=${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Product deleted successfully!');
                        location.reload();
                    } else {
                        alert('Error deleting product');
                    }
                })
                .catch(error => {
                    alert('Error: ' + error.message);
                });
        }
    }
    </script>
</body>

</html>