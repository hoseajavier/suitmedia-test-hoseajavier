import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/suitmedia-bg.png";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0 bg-orange-500/90 backdrop-blur-md" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
            <img src={Logo} alt="Suitmedia" className="h-30 w-auto" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-white font-medium">
            {menuItems.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `hover:underline underline-offset-8 transition ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              className="text-white text-2xl"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 px-4 py-3 space-y-2 text-white bg-orange-500/95 rounded-md backdrop-blur">
            {menuItems.map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block py-2 hover:underline ${
                    isActive ? "underline font-semibold" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
