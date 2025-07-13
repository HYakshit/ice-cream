import React, { useState } from "react";
import Card from "./common/Card";
import { useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid"; // Icon for FAB
import { useNavigate } from "react-router-dom";
import apiService  from "../services/api";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMenu, setShowMenu] = useState(false);
  const categories = ["All", ...new Set(products.map((item) => item.category))];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        // Fallback to local data if API fails
        try {
          const localData = await import('../data/products.js');
          setProducts(localData.default);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const navigate = useNavigate();
  // navigate("http://localhost/ice-cream-api/products.php");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);
  if (loading) {
    return (
      <div className="bg-pink-50 p-4 brown-text">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-pink-50 p-4 brown-text">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 p-4 brown-text">
      {/* Tabs */}
      <div className="hidden md:flex  justify-center gap-4 mb-6 flex-wrap my-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded border ${activeCategory === cat ? "bg-amber-900 text-white" : "bg-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex  dark:bg-teal-950 mt-3 flex-wrap gap-6 justify-center">
        {filteredProducts.map((product) => (
          <Card
            key={product.id || product.name}
            product={product}
            name={product.name}
            price={product.price}
            image={product.image_url || product.image}
            description={product.description}
            category={product.category}
          ></Card>
        ))}
      </div>
      <>
        {/* Floating Filter Button - Only for mobile */}
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-amber-900 flex justify-center  text-white p-3 rounded-full shadow-lg"
            aria-label="Filter Categories"
          >
            <FunnelIcon className="w-6 h-6" />
            Menu
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div className="mt-2 bg-white border rounded shadow-md absolute bottom-14 right-0 w-48">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowMenu(false);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // for smooth scrolling
                    });
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-pink-100 ${activeCategory === cat
                      ? "bg-amber-900 text-white"
                      : "text-black bg-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
};
export default Menu;
