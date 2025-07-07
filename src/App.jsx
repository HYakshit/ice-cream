import "./App.css";

import Cart from "./components/common/Cart";
import Navbar from "./components/Navbar";
// import { ThemeProvider } from "./components/ThemeContext";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import Page404 from "./pages/404"

function App() {
  const links = [
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/login" },
  ];

  return (
    <>
      <ThemeProvider>
        <Navbar links={links} />
        <Routes>
          {/* Example routes, replace with your actual pages */}
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<Page404 />} />

          {/* Add more routes as needed */}
        </Routes>
     </ThemeProvider>


    </>
  );
}

export default App;
