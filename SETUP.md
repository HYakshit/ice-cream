# Ice Cream Application Setup Guide

This guide will help you set up the complete ice cream application with both frontend (React) and backend (PHP/MySQL).

## Prerequisites

1. **XAMPP/WAMP/MAMP** - Local server environment
2. **Node.js** - For React development
3. **Git** - For version control

## Backend Setup

### 1. Database Setup

1. Start your local server (XAMPP/WAMP/MAMP)
2. Start Apache and MySQL services
3. Open your browser and navigate to: `http://localhost/ice-cream-api/setup.php`
4. This will automatically:
   - Create the `icecream` database
   - Create required tables (`products`, `owner`)
   - Insert sample products
   - Insert default owner information

### 2. Verify Backend Setup

1. Test the API: `http://localhost/ice-cream-api/test.php`
2. This will show you a detailed report of all backend components

### 3. Admin Panel

1. Access admin panel: `http://localhost/ice-cream-api/admin.php`
2. Default password: `admin123`
3. Features:
   - View all products
   - Add new products
   - Edit product information
   - Delete products
   - Update owner information

## Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access the Application

Open your browser and go to: `http://localhost:5173`

## API Endpoints

### Products

- `GET /ice-cream-api/products.php` - Get all products
- `POST /ice-cream-api/products.php` - Create new product
- `PUT /ice-cream-api/products.php?id={id}` - Update product
- `DELETE /ice-cream-api/products.php?id={id}` - Delete product

### Owner Information

- `GET /ice-cream-api/owner.php` - Get owner information
- `PUT /ice-cream-api/owner.php` - Update owner information

### File Upload

- `POST /ice-cream-api/upload.php` - Upload images
- `DELETE /ice-cream-api/delete.php?image={filename}` - Delete images

### Categories

- `GET /ice-cream-api/categories.php` - Get all categories

## File Structure

```
ice-cream/
├── ice-cream-api/          # Backend PHP files
│   ├── config.php          # Configuration
│   ├── setup.php           # Database setup
│   ├── products.php        # Products API
│   ├── owner.php           # Owner API
│   ├── upload.php          # Upload API
│   ├── delete.php          # Delete API
│   ├── categories.php      # Categories API
│   ├── admin.php           # Admin panel
│   ├── test.php            # API testing
│   └── uploads/            # Image uploads
├── src/                    # Frontend React files
│   ├── components/         # React components
│   ├── services/           # API services
│   └── data/              # Local data (fallback)
└── README.md              # Project documentation
```

## Configuration

### Database Configuration

Edit `ice-cream-api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'icecream');
```

### API Base URL

Edit `src/services/api.js`:

```javascript
const API_BASE_URL = "http://localhost/ice-cream-api";
```

## Features

### Frontend Features

- ✅ Responsive design
- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ Contact information
- ✅ About us page
- ✅ Loading states and error handling
- ✅ Fallback to local data if API fails

### Backend Features

- ✅ RESTful API endpoints
- ✅ Database management
- ✅ Image upload with validation
- ✅ Admin panel for content management
- ✅ CORS support
- ✅ Error handling and logging
- ✅ Security measures (input validation, SQL injection prevention)

### Admin Panel Features

- ✅ Product management (CRUD operations)
- ✅ Owner information management
- ✅ Image upload and management
- ✅ Category management
- ✅ Real-time updates

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check if MySQL is running
   - Verify database credentials in `config.php`
   - Run setup script again

2. **API Not Responding**

   - Check if Apache is running
   - Verify file permissions
   - Check CORS settings

3. **Image Upload Fails**

   - Check upload directory permissions
   - Verify file size limits
   - Check file type restrictions

4. **Frontend Can't Connect to API**
   - Verify API base URL in `src/services/api.js`
   - Check if backend is running
   - Check browser console for CORS errors

### Testing

1. **Backend Testing**: Visit `http://localhost/ice-cream-api/test.php`
2. **API Testing**: Use Postman or similar tool to test endpoints
3. **Frontend Testing**: Check browser console for errors

## Security Notes

1. **Change default passwords** in production
2. **Use HTTPS** in production
3. **Implement proper authentication** for admin panel
4. **Regular database backups**
5. **Input validation** on all endpoints
6. **File upload security** measures

## Development

### Adding New Features

1. **Backend**: Create new PHP files in `ice-cream-api/`
2. **Frontend**: Add new components in `src/components/`
3. **API Integration**: Update `src/services/api.js`
4. **Testing**: Test both frontend and backend

### Deployment

1. **Backend**: Upload PHP files to web server
2. **Frontend**: Build with `npm run build` and deploy
3. **Database**: Export and import database
4. **Configuration**: Update URLs and credentials

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review error logs
3. Test individual components
4. Verify all prerequisites are installed

## License

This project is for educational purposes. Please respect the original creators and use responsibly.
