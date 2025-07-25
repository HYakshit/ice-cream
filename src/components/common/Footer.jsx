import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
} from "@heroicons/react/24/solid";
import owner from "../../data/owner";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InlineLink } from "./InlineLink";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-amber-800 text-white p-3 pt-8 border-t pb-4 px-6v ">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div>
                    <h1 className="text-2xl  font-bold  mb-2">{owner.shopname || "Shop name"}</h1>
                    <p className="text-sm ">
                        Scooping smiles since 2024. Come chill with us!
                    </p>
                </div>

                {/* Navigation */}
                <div >
                    <h3 className="font-semibold text-lg mb-2 ">Quick Links</h3>
                    <ul className="space-y-1  text-sm">
                        <li><InlineLink isFlex={false} LinkUrl="/Menu">Menu</InlineLink></li>
                        <li><InlineLink isFlex={false} LinkUrl="/about">About Us</InlineLink></li>
                        <li><InlineLink isFlex={false} LinkUrl="contactus">Contact</InlineLink></li>
                        {owner.agregators && owner.agregators.length > 0 && owner.agregators.map((aggregator) => (
                            <li key={aggregator.name}>
                                <InlineLink
                                    LinkUrl={aggregator.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    isFlex={false}
                                >
                                    {aggregator.name}
                                </InlineLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold  text-lg mb-1">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 " />

                            <InlineLink

                                id="getmethere"
                                LinkUrl={owner.gmap}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {owner.address || "your address here"}
                            </InlineLink>

                        </li>
                        <li className="flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5" />
                            {owner.mobile.map((mobile, index) => (
                                <React.Fragment key={index}>
                                    <a href={`tel:${mobile}`} className="text-inherit no-underline link-custom">
                                        {mobile || "your phone number here"}
                                    </a>
                                    {index !== owner.mobile.length - 1 && <span>OR</span>}
                                </React.Fragment>
                            ))}
                        </li>

                        <li className="flex items-center gap-2 ">
                            <EnvelopeIcon className="w-5 h-5 mr-2" />
                            <InlineLink LinkUrl={`mailto:minisfruitcream@gmail.com`}>

                                <span className="whitespace-nowrap">
                                    {owner.email || "Your Email"}
                                </span></InlineLink>
                        </li>
                    </ul>
                    <div className="mt-4 flex gap-4 text-4xl ">
                        <a href={owner.whatsapp || "#"}
                            target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className=" text-green-500 bg-white p-1 hover:bg-green-500 hover:text-white rounded-full transition" />
                        </a>
                        <a href={owner.facebook || "#"} target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-blue-600 bg-white p-1 hover:bg-blue-600 hover:text-white rounded-full transition" />
                        </a>
                        <a href={owner.instagram || "#"} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className=" text-red-600 bg-white p-1 hover:bg-red-600 hover:text-white rounded-full transition" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t mt-10 pt-4 text-center text-sm ">
                &copy; {new Date().getFullYear()} {owner.shopname}. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
