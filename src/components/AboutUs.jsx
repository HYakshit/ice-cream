import React from "react";
import owner from "../data/owner";
import { Heading } from "./common/Typography";
const images = import.meta.glob('../assets/Images/*.{jpg,jpeg,png}', {
  eager: true
});

const getImageByName = (fileName) => {
  const match = Object.entries(images).find(([path]) =>
    path.includes(fileName)
  );
  return match ? match[1].default : null;
};
const aboutImages = ["eating.jpg"];
const AboutUs = () => {
  return (
    <section className="bg-rose-50 py-12 px-4" id="about">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src=
            {getImageByName("eating.jpg")}
            alt="About Us Ice Cream"
            className="rounded-3xl shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2">
          <Heading alignText="left">About Us</Heading>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Welcome to <span className="font-semibold">{owner.shopname}</span> – your neighborhood’s
            favorite spot for creamy, dreamy delights! We serve handcrafted ice creams, shakes, and fruit creams made with real ingredients and a lot of love.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Since 2024, we’ve been blending flavors and smiles. Whether you're craving a refreshing mojito or a rich chocolate shake, our menu is designed to chill your cravings.
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
