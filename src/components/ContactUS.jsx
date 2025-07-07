import React from 'react';

const ContactUS = () => {
    return (
        <section className="view contact bg-pink-50" id="contact">
         

            <div className="row flex flex-col md:flex-row gap-8  px-4">
                {/* Map Section */}
                <div className="map-area w-full md:w-1/2">
                 <h2 className="p-3 text-center" >Locate Us</h2>
                    <div className="map-container relative overflow-hidden pb-[56.25%] h-0">
                       
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3381.978292252778!2d75.410148!3d32.042779!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b93aa977f99e9%3A0x31a94a7200616935!2sAnjani%20Courier%20Service!5e0!3m2!1sen!2sin!4v1728828334322!5m2!1sen!2sin"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            title="Map Location"
                        ></iframe>
                    </div>

                    <div className="mt-4 text-center">
                        <a
                            className="btn bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-700"
                            id="getmethere"
                            href="https://www.google.com/maps/dir/31.6124396,74.8718894/Anjani+Courier+Service,+Civil+Line+Rd,+opp.+Rigali+Hotel,+Civil+Lines,+Gurdaspur,+Punjab+143521"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get me there
                        </a>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="w-full md:w-1/2 text-center flex flex-col justify-center items-center">
                    <h3 className="sub-heading text-xl font-semibold mb-4">Contact Us</h3>

                    <ul className="list-none flex flex-col items-center gap-3 text-gray-700">
                        <li>
                            <a href="tel:  +91 7888796675" className="text-inherit no-underline  hover:underline">
                                +91 78887 96675
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:minisfruitcream@gmail.com"
                                className="text-inherit no-underline hover:underline"
                            >
                                minisfruitcream@gmail.com
                            </a>
                        </li>
                    </ul>

                    <div className="mt-4 text-sm text-gray-600 font-medium px-4">
                        <p>
                            Civil Line Rd, opp. Rigali Hotel, Civil Lines, Gurdaspur, Punjab 143521
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUS;
