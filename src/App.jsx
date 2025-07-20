import "./App.css";

import Cart from "./components/common/Cart";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import ContactUS from "./components/ContactUS";
import AboutUs from "./components/AboutUs";
// import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import Page404 from "./pages/404"
import Footer from "./components/common/Footer";
import Home from "./components/Home";
import Modal from "./components/common/Modal";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  const [showModal, setShowModal] = useState(true);

useEffect(() => {
  setShowModal(true); 

  const timer = setTimeout(() => {
    setShowModal(false);
  }, 2000); 

  return () => clearTimeout(timer); 
}, []); // ✅


  return (
    <>
    
        {showModal && <Modal message="This is a demo site. Contact developer to get source code" />}
        <Navbar/>
        <Routes >
          {/* Example routes, replace with your actual pages */}
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Add more routes as needed */}
        </Routes>
        <Footer></Footer>
     


    </>
  );
}

export default App;
