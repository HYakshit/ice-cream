import React, { useState } from 'react'
import products from '../data/products';
import Card from "../components/common/Card";
import { FunnelIcon } from '@heroicons/react/24/solid'; // Icon for FAB
const Products = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMenu, setShowMenu] = useState(false);
    const categories = ["All", ...new Set(products.map((item) => item.category))];

    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((p) => p.category === activeCategory);
    return (
        <div className="bg-pink-50 p-4">
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
                        product={product}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                        category={product.category}></Card>
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
                                    }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-pink-100 ${activeCategory === cat ? "bg-amber-900 text-white" : "text-black bg-white"
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
    )
}

export default Products
