import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
} from "@heroicons/react/24/solid";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-pink-100 p-2  pt-10 pb-6 px-6v ">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div>
                    <h1 className="text-2xl  font-bold  mb-2">MINI Fruit cream🍦</h1>
                    <p className="text-sm">
                        Scooping smiles since 2020. Come chill with us!
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-lg mb-2 ">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link to="/" className="hover:">Menu</Link></li>
                        <li><Link to="/about" className="hover:">About Us</Link></li>
                        <li><Link to="contactus" className="hover:">Contact</Link></li>
                        <li>  <Link to={"https://www.swiggy.com/city/amritsar/mini-fruit-cream-north-amritsar-rest1103805"}>Order Now</Link></li>
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
                                href="https://www.google.com/maps/dir/31.6124396,74.8718894/Anjani+Courier+Service,+Civil+Line+Rd,+opp.+Rigali+Hotel,+Civil+Lines,+Gurdaspur,+Punjab+143521"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kot Khalsa near railway station, Amritsar, India
                            </a>

                        </li>
                        <li className="flex items-center gap-2">
                            <PhoneIcon className="w-5 h-5 " />
                            <a href="tel:  +91 7888796675" className="text-inherit no-underline  hover:underline">
                                +91 78887 96675
                            </a>

                        </li>
                        <li className="flex items-center gap-2">
                            <EnvelopeIcon className="w-5 h-5 " />
                            <span>minisfruitcream@gmail.com</span>
                        </li>
                    </ul>
                    <div className="mt-4 flex gap-4 text-2xl ">
                        <Link to="https://api.whatsapp.com/send?phone=917888796675&text=Hi%20there!%20I%20want%20to%20order%20an%20ice%20cream.
" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className="hover:text-green-500 transition" />
                        </Link>
                        <Link to="https://www.facebook.com/profile.php?id=61564018252348" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="hover:text-blue-600 transition" />
                        </Link>
                        <Link to="https://www.instagram.com/minisfruitcream/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-red-500 transition" />
                        </Link>
                    </div>
                </div>

            </div>

            <div className="border-t mt-10 pt-4 text-center text-sm ">
                &copy; {new Date().getFullYear()} MINI Fruit cream. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
