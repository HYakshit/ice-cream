import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
} from "@heroicons/react/24/solid";
import owner from "../../data/owner";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-pink-100 p-2  pt-10 pb-6 px-6v ">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div>
                    <h1 className="text-2xl  font-bold  mb-2">{owner.shopname || "Shop name"}</h1>
                    <p className="text-sm">
                        Scooping smiles since 2020. Come chill with us!
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-lg mb-2 ">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link to="/Menu" className="hover:">Menu</Link></li>
                        <li><Link to="/about" className="hover:">About Us</Link></li>
                        <li><Link to="contactus" className="hover:">Contact</Link></li>
                        {owner.agregators && owner.agregators.length > 0 && owner.agregators.map((aggregator) => (
                            <li key={aggregator.name}>
                                <Link
                                    to={aggregator.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    {aggregator.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold  text-lg mb-2">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 " />

                            <a
                                className="  hover:bg-pink-100"
                                id="getmethere"
                                href={owner.gmap}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {owner.address || "your address here"}
                            </a>

                        </li>
                        <li className="flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5 " />
                            <Link to={`tel:${owner.mobile}  `} className="text-inherit no-underline ">
                                {owner.mobile || "your phone number here"}
                            </Link>

                        </li>
                        <li className="flex items-center gap-2">
                            <EnvelopeIcon className="w-5 h-5 " />
                            <span>{owner.email || "your E-mail"}</span>
                        </li>
                    </ul>
                    <div className="mt-4 flex gap-4 text-2xl ">
                        <Link to={owner.whatsapp || "#"}
                            target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className=" text-green-500 hover:bg-green-500 hover:text-white rounded-full transition" />
                        </Link>
                        <Link to={owner.facebook || "#"} target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-blue-600 hover:bg-blue-500 hover:text-white rounded-full transition" />
                        </Link>
                        <Link to={owner.instagram || "#"} target="_blank" rel="noopener noreferrer">
                            <FaInstagram className=" text-orange-600 hover:bg-orange-600 hover:text-white rounded-full transition" />
                        </Link>
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
