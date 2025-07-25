import React from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "./common/ContactForm";
import CarouselComponent from "./common/CarouselComponent";
import { LinkComponent } from "./common/LinkComponent";
import owner from "../data/owner";
import { Heading, SubHeading } from "./common/Typography";
const images = import.meta.glob('../assets/Images/*.{jpg,jpeg,png,webp}', {
    eager: true
});

const getImageByName = (fileName) => {
    const match = Object.entries(images).find(([path]) =>
        path.includes(fileName)
    );
    return match ? match[1].default : null;
};
const carousalImages = ["pineapple.png", "apple.png", "grapes.png", "banana.png"];
const carousalImageUrls = carousalImages.map(carousalImage => getImageByName(carousalImage));
const carousalItems = { "images": carousalImages };
const Home = () => {
    const flavours = ["Strawberry", "Chocolate", "Mango", "Vanilla"];
    const flavourImages = {
        "Strawberry": "Strawberry Shakes.jpg"
        , "Chocolate": "Choclate Shakes.jpg"
        , "Mango": "Mango Shakes.jpg"
        , "Vanilla": "Vanila Shakes.jpg"
    }

    return (
        <div className="w-full bg-rose-50">
            {/* Section 1: Hero */}
            <section
                className="h-[57vh] md:h-[75vh] relative flex items-center py-12 px-6 text-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${getImageByName("hero.webp")})` }}
            >
                {/* Overlay with blur */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

                <div className="relative max-w-4xl mx-auto text-white">
                  <Heading size="1xl" >  
                        Welcome to {owner.shopname}
                   </Heading>
                   <SubHeading > 
                        Scoop into Happiness 🍨
                   </SubHeading>
                    <p className="mt-4 md:text-2xl drop-shadow-md">
                        Discover our creamy, dreamy ice creams made with real love and real ingredients.
                    </p>
                    <div className="mt-5">
                        <LinkComponent linkUrl="/Menu">View Menu</LinkComponent>
                    </div>
                </div>
            </section>

            {/* Section 2: Flavor Highlights */}
            <section className="bg-white py-12 px-6">
                <SubHeading >
                    Delivering the Goodness of Fruits
                </SubHeading>
                <div>
                    <CarouselComponent carousalItems={carousalItems} />
                    {/* <CarouselComponent images={carousalImages.map(carousalImage => getImageByName(carousalImage))} /> */}
                    {/* {flavours.map((flavour, i) => (
                        <div
                            key={i}
                            className="bg-rose-50 rounded-lg shadow-sm p-4 text-center hover:scale-105 transition-transform"
                        >
                            <img
                                src={flavourImages[flavour] ? getImageByName(flavourImages[flavour]) : ""}
                                alt={flavour}
                                className="mx-auto mb-4 rounded-full"
                            />
                            <h3 className="text-xl font-medium ">{flavour}</h3>
                        </div>
                    ))} */}
                </div>
            </section>

            {/* Section 3: Why Choose Us */}
            <section className="bg-rose-50 py-12 px-6">
              <SubHeading >  
                    Why Choose Us?
                </SubHeading>
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
            </section >
            {/* Section 4: Contact Form */}
            <section className="bg-white py-12 px-6 ">
               <SubHeading > Get in Touch</SubHeading>
                <ContactForm fieldMargin={"m-2"} bgColor="bg-rose-50"></ContactForm>
            </section>

        </div>
    );
};

export default Home;