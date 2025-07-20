import React from 'react';
import owner from '../data/owner';
import { Link } from 'react-router-dom';
import { ContactForm } from './common/ContactForm';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { LinkComponent } from './common/LinkComponent';

const ContactUS = () => {
    return (
        <section className="view contact bg-rose-50 p-4" id="contact">
            <div className="row flex flex-col md:flex-row gap-8  px-4">
                {/* Map Section */}
                <div className="map-area w-full md:w-1/2">
                    <h2 className="p-3 text-center font-semibold" >Locate Us</h2>

                    <div className="map-container relative overflow-hidden pb-[56.25%] h-0">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.3694791011653!2d74.82583439999999!3d31.623732600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919658508c8273b%3A0x9c7cba8c04482ffb!2sMini&#39;s%20Fruit%20Cream!5e0!3m2!1sen!2sin!4v1751974378011!5m2!1sen!2sin"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            title="Map Location"></iframe>

                    </div>
                    <div className="mt-7 text-center">
                        <LinkComponent id={"getmethere"} linkUrl={owner.gmap || "#"}>  Get me there</LinkComponent>
                   
                    </div>
                </div>

                {/* Contact Section */}
                <div className="w-full md:w-1/2 text-center color-amber-900  flex flex-col justify-center items-center">
                    <h3 className="sub-heading text-xl font-semibold mb-4">Contact Us</h3>
                    <div className="contact mb-3 text-gray-700">

                        <ul className="flex flex-col md:flex-row items-center justify-center gap-y-3 md:gap-y-0 md:gap-x-8">
                            {/* Phone */}
                            <li>
                                <a
                                    href="tel:+917888796675"
                                    className="flex items-center justify-center "
                                >
                                    <PhoneIcon className="w-5 h-5 mr-2" />
                                    <span className="whitespace-nowrap">
                                        {owner.mobile || "Your Phone Number"}
                                    </span>
                                </a>
                            </li>

                            {/* Email */}
                            <li>
                                <a
                                    href="mailto:minisfruitcream@gmail.com"
                                    className="flex items-center justify-center "
                                >
                                    <EnvelopeIcon className="w-5 h-5 mr-2" />
                                    <span className="whitespace-nowrap">
                                        {owner.email || "Your Email"}
                                    </span>
                                </a>
                            </li>
                        </ul>


                        <div className="mt-3 md:px-2">

                            <p className=" flex justify-center  items-start md:items-center">
                                <MapPinIcon className="w-5 h-5  mr-2" />
                                {owner.address || "your address here"}
                            </p>
                        </div>
                    </div>
                    <ContactForm fieldMargin={"m-2"} bgColor="bg-amber-50"></ContactForm>

                </div>
            </div>
        </section>
    );
};

export default ContactUS;
