import React, { useState } from 'react'
import products from '../data/products';
import Card from "../components/common/Card";

const Products = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...new Set(products.map((item) => item.category))];

    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((p) => p.category === activeCategory);
    return (
        <>
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap my-4">
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
            <div className="flex  dark:bg-teal-950 mt-3 flex-wrap gap-6 justify-center">


                {filteredProducts.map((product) => (
                    <Card
                        product={product}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                        category={product.category}></Card>
                ))}
            </div>
        </>
    )
}

export default Products
