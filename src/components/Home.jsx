import React from "react";
import { Link } from "react-router-dom";
const images = import.meta.glob('../assets/Images/*.{jpg,jpeg,png}', {
    eager: true
});

const getImageByName = (fileName) => {
    const match = Object.entries(images).find(([path]) =>
        path.includes(fileName)
    );
    return match ? match[1].default : null;
};
const Home = () => {
    const flavours = ["Strawberry", "Chocolate", "Mango", "Vanilla"];
    const flavourImages = {
        "Strawberry": "Strawberry Shakes.jpg"
        , "Chocolate": "Choclate Shakes.jpg"
        , "Mango": "Mango Shakes.jpg"
        , "Vanilla": "Vanila Shakes.jpg"
    }
    return (
        <div className="w-full bg-pink-50">
            {/* Section 1: Hero */}
            <section className=" py-12 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold ">
                        Scoop into Happiness 🍨
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        Discover our creamy, dreamy ice creams made with real love and real ingredients.
                    </p>
                    <div className="mt-6">
 <Link to={"/products"} className=" bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition">
                        View Menu
                    </Link>
                    </div>
                   
                </div>
            </section>

            {/* Section 2: Flavor Highlights */}
            <section className="bg-white py-12 px-6">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Popular Flavours
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {flavours.map((flavour, i) => (
                        <div
                            key={i}
                            className="bg-pink-50 rounded-lg shadow-sm p-4 text-center hover:scale-105 transition-transform"
                        >
                            <img
                               src={flavourImages[flavour] ? getImageByName(flavourImages[flavour]) : ""}
                                alt={flavour}
                                className="mx-auto mb-4 rounded-full"
                            />
                            <h3 className="text-xl font-medium ">{flavour}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Why Choose Us */}
            <section className="bg-pink-50 py-12 px-6">
                <h2 className="text-3xl font-semibold text-center  mb-8">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-bold  mb-2">Fresh Ingredients</h3>
                        <p className="text-gray-600">We use real milk, fruits, and premium toppings.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-bold  mb-2">Wide Variety</h3>
                        <p className="text-gray-600">From classics to seasonal flavours, there's something for everyone.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-bold  mb-2">Loved Locally</h3>
                        <p className="text-gray-600">A neighbourhood favorite trusted by families and friends.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;