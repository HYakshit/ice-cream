import "./App.css";

import Cart from "./components/common/Cart";
import Navbar from "./components/Navbar";
// import { ThemeProvider } from "./components/ThemeContext";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import { ThemeContext, ThemeProvider } from "./components/ThemeContext";


function App() {
  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
  ];

  return (
    <>
      <ThemeProvider>
        <Navbar links={links} />
        <Routes>
          {/* Example routes, replace with your actual pages */}
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          {/* Add more routes as needed */}
        </Routes>
      </ThemeProvider>


    </>
  );
}

export default App;
