import React from 'react'
import products from '../data/products';
const CategoryTabs = ({activeCategory,setActiveCategory}) => {
    const categories = ["All", ...new Set(products.map((item) => item.category))];
    return (
        // Tabs
        <div className="flex gap-4 mb-6 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded border ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs