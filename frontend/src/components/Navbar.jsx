import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Use lucide icons for theme

// Centralized Navigation Links for Easy Management
const navLinks = [
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact Us" },
];

function Navbar() {
  // Theme state: "light" or "dark"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // Navbar container with Tailwind styling
    <div
      className="navbar shadow bg-base-100 sticky top-0 z-50"
      style={{
        borderBottom: "4px solid",
        borderImage: "linear-gradient(to right, #4f8cff, #b47cff, #ff6ac1) 1",
      }}
    >
      {/* LEFT SECTION: Brand Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Dropdown for mobile view (hamburger menu) */}
        <div className="dropdown">
          {/* Mobile Menu Button (Hamburger Icon) */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Dropdown Menu Items (Visible on Small Screens) */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          AI Powered Resume Generator
        </NavLink>
      </div>

      {/* CENTER SECTION: Navigation Links (Visible on Large Screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-bold"
                    : "hover:text-blue-500 transition-colors"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SECTION: Login Button */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6 text-blue-600" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-400" />
          )}
        </button>
        <NavLink
          to="/login"
          className="btn bg-gray-100 border-none shadow hover:bg-blue-100 text-blue-900 font-semibold"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
