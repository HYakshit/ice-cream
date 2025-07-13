# Ice Cream API Backend

This is the backend API for the Ice Cream application, built with PHP and MySQL.

## Setup Instructions

### 1. Database Setup

1. Make sure you have XAMPP, WAMP, or similar local server installed
2. Start Apache and MySQL services
3. Navigate to `http://localhost/ice-cream-api/setup.php` to create the database and tables
4. The setup script will:
   - Create the `icecream` database
   - Create `products` and `owner` tables
   - Insert sample products
   - Insert default owner information

### 2. Configuration

Edit `config.php` to match your database settings:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'icecream');
```

### 3. File Structure

```
ice-cream-api/
├── config.php          # Configuration settings
├── db.php             # Database connection
├── setup.php          # Database setup script
├── products.php       # Products API endpoint
├── owner.php          # Owner information API
├── upload.php         # Image upload endpoint
├── delete.php         # Image deletion endpoint
├── categories.php     # Categories API endpoint
├── admin.php          # Admin interface
├── .htaccess         # Apache configuration
└── uploads/          # Image upload directory
```

## API Endpoints

### Products API (`products.php`)

- **GET** `/products.php` - Get all products
- **POST** `/products.php` - Create new product
- **PUT** `/products.php?id={id}` - Update product
- **DELETE** `/products.php?id={id}` - Delete product

**Product Object Structure:**

```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 80.0,
  "image_url": "/uploads/image.jpg",
  "category": "Category Name",
  "quantity": "250 grms",
  "rating": 4.5,
  "created_at": "2024-01-01 12:00:00",
  "updated_at": "2024-01-01 12:00:00"
}
```

### Owner API (`owner.php`)

- **GET** `/owner.php` - Get owner information
- **PUT** `/owner.php` - Update owner information

**Owner Object Structure:**

```json
{
  "id": 1,
  "name": "Owner Name",
  "email": "email@example.com",
  "mobile": "+91 1234567890",
  "gmap": "https://maps.google.com/...",
  "address": "Shop Address",
  "shopname": "Shop Name",
  "whatsapp": "https://wa.me/...",
  "instagram": "https://instagram.com/...",
  "facebook": "https://facebook.com/..."
}
```

### Upload API (`upload.php`)

- **POST** `/upload.php` - Upload image file

**Request:** Multipart form data with `image` field
**Response:**

```json
{
  "success": true,
  "url": "/ice-cream-api/uploads/filename.jpg",
  "filename": "filename.jpg"
}
```

### Categories API (`categories.php`)

- **GET** `/categories.php` - Get all unique categories
- **POST** `/categories.php` - Update categories

## Admin Interface

Access the admin panel at `http://localhost/ice-cream-api/admin.php`

**Default password:** `admin123`

**Features:**

- View all products
- Add new products
- Edit product information
- Delete products
- Update owner information
- Manage categories

## Frontend Integration

Update your frontend API calls to use the correct endpoints:

```javascript
// Get products
fetch("http://localhost/ice-cream-api/products.php")
  .then((res) => res.json())
  .then((products) => console.log(products));

// Get owner info
fetch("http://localhost/ice-cream-api/owner.php")
  .then((res) => res.json())
  .then((owner) => console.log(owner));

// Upload image
const formData = new FormData();
formData.append("image", file);
fetch("http://localhost/ice-cream-api/upload.php", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((result) => console.log(result));
```

## Security Considerations

1. **Change default passwords** in production
2. **Use HTTPS** in production
3. **Implement proper authentication** for admin panel
4. **Validate and sanitize** all inputs
5. **Set up proper CORS** for your domain
6. **Backup database** regularly

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

Error responses include a message:

```json
{
  "error": "Error description"
}
```

## File Upload

- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 5MB
- Files are stored in `uploads/` directory
- Unique filenames are generated to prevent conflicts

## Database Schema

### Products Table

```sql
CREATE TABLE products (
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
);
```

### Owner Table

```sql
CREATE TABLE owner (
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
);
```

## Troubleshooting

1. **Database connection failed**: Check database credentials in `config.php`
2. **Upload directory not writable**: Set proper permissions on `uploads/` directory
3. **CORS errors**: Check `.htaccess` file and CORS headers
4. **Admin panel not accessible**: Ensure PHP sessions are enabled

## Development

To add new features:

1. Create new PHP files for new endpoints
2. Update `config.php` for new settings
3. Test with Postman or similar tool
4. Update frontend to use new endpoints
5. Update this README with new API documentation
