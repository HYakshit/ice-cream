// api.js - API service for ice cream application

const API_BASE_URL = "http://localhost:3000/ice-cream-api";

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Generic fetch wrapper with error handling
  async fetchWithErrorHandling(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Products API
  async getProducts() { 
    // console.log("Fetching products from:", `${this.baseUrl}/products.php`);
    return this.fetchWithErrorHandling(`${this.baseUrl}/products.php`);
  }

  async createProduct(productData) {
    return this.fetchWithErrorHandling(`${this.baseUrl}/products.php`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.fetchWithErrorHandling(
      `${this.baseUrl}/products.php?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
      }
    );
  }

  async deleteProduct(id) {
    return this.fetchWithErrorHandling(
      `${this.baseUrl}/products.php?id=${id}`,
      {
        method: "DELETE",
      }
    );
  }

  // Owner API
  async getOwner() {
    return this.fetchWithErrorHandling(`${this.baseUrl}/owner.php`);
  }

  async updateOwner(ownerData) {
    return this.fetchWithErrorHandling(`${this.baseUrl}/owner.php`, {
      method: "PUT",
      body: JSON.stringify(ownerData),
    });
  }

  // Categories API
  async getCategories() {
    return this.fetchWithErrorHandling(`${this.baseUrl}/categories.php`);
  }

  // Upload API
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${this.baseUrl}/upload.php`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error("Upload Error:", error);
      throw error;
    }
  }

  // Delete image API
  async deleteImage(imageUrl) {
    const filename = imageUrl.split("/").pop();
    return this.fetchWithErrorHandling(
      `${this.baseUrl}/delete.php?image=${filename}`,
      {
        method: "DELETE",
      }
    );
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/test.php`);
      return await response.json();
    } catch (error) {
      console.error("Connection test failed:", error);
      return { error: "Connection failed" };
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOwner,
  updateOwner,
  getCategories,
  uploadImage,
  deleteImage,
  testConnection,
} = apiService;
