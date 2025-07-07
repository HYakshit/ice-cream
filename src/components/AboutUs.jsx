import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-pink-50 py-12 px-4" id="about">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
            alt="About Us Ice Cream"
            className="rounded-3xl shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold  mb-4">About Us</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Welcome to <span className="font-semibold">MINI Fruit cream</span> – your neighborhood’s
            favorite spot for creamy, dreamy delights! We serve handcrafted ice creams, shakes, and fruit creams made with real ingredients and a lot of love.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Since 2020, we’ve been blending flavors and smiles. Whether you're craving a refreshing mojito or a rich chocolate shake, our menu is designed to chill your cravings.
          </p>
          <p className=" font-semibold">
            🍦 Taste the tradition, scoop by scoop!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
