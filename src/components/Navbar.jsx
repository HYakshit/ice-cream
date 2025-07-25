import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwner } from "../features/owner/ownerSlice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { owner, loading, error } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(fetchOwner());
  }, [dispatch]);

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
  const links = [
    { label: "Menu", path: "/Menu" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "./contactus" },
  ];
  return (
    <nav className="bg-pink-100 dark:bg-red-400 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold">
          {owner.shopname || "Shop Name"}
        </Link>
        {/* Dark mode toggle button for desktop */}
        {/* <button
          onClick={toggleTheme}
          className="hidden md:inline-block ml-4 px-2 py-1 rounded bg-amber-900 text-white hover:bg-amber-700 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? "🌙" : "☀️"}
        </button> */}
        <ul className="hidden md:menu font-bold md:menu-horizontal px-1">
          {links.map((link, idx) => (
            <li key={idx}>
              {" "}
              <Link
                to={link.path}
                className="hover:text-white hover:bg-amber-900"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="bg-pink-100 hover:text-white hover:bg-amber-900">
            <details>
              <summary>Order Online</summary>
              <ul className=" rounded-t-none p-2">
                {owner.agregators && owner.agregators.length > 0 && owner.agregators.map((aggregator) => (
                  <li key={aggregator.name}>
                    <Link
                      to={aggregator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-900"
                    >
                      {aggregator.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>

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
      {
        menuOpen && (
          <div className="md:hidden font-semibold absolute top-16 left-0 w-full bg-pink-100 shadow-md px-4 py-4 z-40">
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
                <details>
                  <summary>Order Online</summary>
                  <ul className=" rounded-t-none p-2">
                    {owner.agregators && owner.agregators.length > 0 && owner.agregators.map((aggregator) => (
                      <li key={aggregator.name}>
                        <Link
                          to={aggregator.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" "
                        >
                          {aggregator.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

            </ul>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
