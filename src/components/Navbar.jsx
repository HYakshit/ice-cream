import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./ThemeContext";
import { useSelector } from "react-redux";

const Navbar = ({ links }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);

  return (
    <nav className="bg-pink-100 dark:bg-teal-950 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold">
          MINI Fruit cream
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center font-semibold">
          {links.map((link, idx) => (
            <Link key={idx} to={link.path} className="hover:text-pink-800">
              {link.label}
            </Link>
          ))}
          <details className="dropdown">
            <summary className="cursor-pointer">Order online</summary>
            <ul className="p-2 bg-white shadow-md rounded">
              <li>
                <Link
                  to="https://www.swiggy.com/city/amritsar/mini-fruit-cream-north-amritsar-rest1103805"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Swiggy
                </Link>
              </li>
            </ul>
          </details>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-rose-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-rose-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-pink-100 shadow-md px-4 py-4 z-40">
          <ul className="space-y-3 font-medium">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="block hover:text-pink-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>

              <a
                href="https://www.swiggy.com/city/amritsar/mini-fruit-cream-north-amritsar-rest1103805"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-pink-800"
              >
                Swiggy
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
