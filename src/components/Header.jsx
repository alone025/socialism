import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md border-b border-gray-200 py-2" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo2.svg"
              alt="ALUSSINE"
              className={`transition-all duration-300 ${
                isScrolled ? "w-16" : "w-24"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center space-x-12">
            {[
              { path: "/", label: "Главная" },
              { path: "/about", label: "О нас" },
              { path: "/contacts", label: "Контакты" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`uppercase text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? "text-primary-600"
                    : "text-gray-700 hover:text-primary-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex space-x-3">
            <Link
              to="/need-help"
              className={`px-5 py-2 rounded-md font-semibold text-sm text-white transition-all duration-300 ${
                isScrolled
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "bg-primary-500 hover:bg-primary-600"
              }`}
            >
              Решения для семей
            </Link>
            <Link
              to="/want-work"
              className={`px-5 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                isScrolled
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : "bg-secondary-500 text-white hover:bg-secondary-600"
              }`}
            >
              Карьера
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-700"></div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="py-4 border-t border-gray-200 mt-3">
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <Link to="/" className="text-gray-700 hover:text-primary-600">
                Главная
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600">
                О нас
              </Link>
              <Link
                to="/contacts"
                className="text-gray-700 hover:text-primary-600"
              >
                Контакты
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  to="/need-help"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-center hover:bg-primary-700"
                >
                  Решения для семей
                </Link>
                <Link
                  to="/want-work"
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-center hover:bg-gray-200"
                >
                  Карьера
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
