import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOwner } from "../services/api";

const ContactUS = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    mobile: "",
    gmap: "",
    address: "",
    shopname: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        setLoading(true);
        const data = await getOwner();
        setOwner(data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
        // Fallback to default data
        setOwner({
          name: "MINI Fruit cream",
          email: "minisfruitcream@gmail.com",
          mobile: "+91 78887 96675",
          gmap: "https://maps.app.goo.gl/mBRWcqfkSXENoHWJ8",
          address:
            "Kot Khalsa near railway station, Amritsar, India, Punjab region",
          shopname: "MINI Fruit cream",
          whatsapp:
            "https://api.whatsapp.com/send?phone=917888796675&text=Hi%20there!%20I%20want%20to%20order%20an%20ice%20cream.%20Please%20let%20me%20know%20the%20available%20flavours.",
          instagram: "https://www.instagram.com/minisfruitcream/",
          facebook: "https://www.facebook.com/profile.php?id=61564018252348",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  if (loading) {
    return (
      <section className="view contact bg-pink-50" id="contact">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="view contact bg-pink-50" id="contact">
      <div className="row flex flex-col md:flex-row gap-8  px-4">
        {/* Map Section */}
        <div className="map-area w-full md:w-1/2">
          <h2 className="p-3 text-center">Locate Us</h2>

          <div className="map-container relative overflow-hidden pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.3694791011653!2d74.82583439999999!3d31.623732600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919658508c8273b%3A0x9c7cba8c04482ffb!2sMini&#39;s%20Fruit%20Cream!5e0!3m2!1sen!2sin!4v1751974378011!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Map Location"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <Link
              className="btn bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-700"
              id="getmethere"
              to={owner.gmap || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get me there
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/2 text-center flex flex-col justify-center items-center">
          <h3 className="sub-heading text-xl font-semibold mb-4">Contact Us</h3>

          <ul className="list-none flex flex-col items-center gap-3 text-gray-700">
            <li>
              <a
                href="tel:  +91 7888796675"
                className="text-inherit no-underline  hover:underline"
              >
                {owner.mobile || "your phone number here"}
              </a>
            </li>
            <li>
              <a
                href="mailto:minisfruitcream@gmail.com"
                className="text-inherit no-underline hover:underline"
              >
                {owner.email || "your E-mail"}
              </a>
            </li>
          </ul>

          <div className="mt-4 text-sm text-gray-600 font-medium px-4">
            <p>{owner.address || "your address here"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUS;
