import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { 
  TbHome, 
  TbInfoCircle, 
  TbSettings, 
  TbWorld, 
  TbNews, 
  TbBriefcase,
  TbPhone,
  TbX
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

import Button from "./Button";

const navItems = [
  { name: "Home", path: "/", icon: TbHome },
  { name: "About Us", path: "/about-us", icon: TbInfoCircle },
  { name: "Services", path: "/services", icon: TbSettings },
  { name: "Network", path: "/network-offices", icon: TbWorld },
  { name: "News", path: "/news-and-insights", icon: TbNews },
  { name: "Career", path: "/career", icon: TbBriefcase },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle scroll behavior - only when menu is closed
  useEffect(() => {
    if (isMenuOpen) return; // Don't update navbar visibility when menu is open
    
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMenuOpen]);

  // Animate navbar visibility - keep visible when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(navContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
      });
    } else {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible, isMenuOpen]);

  // Animate mobile menu items when opened
  useEffect(() => {
    if (isMenuOpen) {
      // Stagger menu items entrance
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Slide-out Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-110 shadow-2xl transform transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Transline</h3>
              <p className="text-xs text-gray-500">Global Logistics</p>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
          >
            <TbX className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4 px-3 overflow-y-auto h-[calc(100%-180px)]">
          {navItems.map((item, index) => (
            <Link
              key={index}
              ref={(el) => (menuItemsRef.current[index] = el)}
              to={item.path}
              className="group flex items-center gap-4 px-4 py-4 mx-1 mb-1 rounded-2xl text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-11 h-11 rounded-xl bg-gray-100 group-hover:bg-linear-to-br group-hover:from-blue-500 group-hover:to-purple-600 flex items-center justify-center transition-all duration-300">
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </span>
                <p className="text-xs text-gray-400">Explore {item.name.toLowerCase()}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Menu Footer - Contact Button */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-white via-white to-transparent">
          <Link
            ref={(el) => (menuItemsRef.current[navItems.length] = el)}
            to="/contact-us"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-95"
          >
            <TbPhone className="w-5 h-5" />
            Contact Us
          </Link>
          <p className="text-center text-xs text-gray-400 mt-3">
            © 2024 Transline Global Logistics
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-7">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:block">
                  Transline
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex h-full items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="nav-hover-btn"
                >
                  {item.name}
                </Link>
              ))}

              <Link to="/contact-us">
                <Button
                  id="contact-button"
                  title="Contact Us"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-blue-50 flex items-center justify-center gap-1 ml-6"
                />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer z-50 hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center items-center w-5 h-5">
                <span
                  className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-out ${
                    isMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-out my-1 ${
                    isMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white rounded-full transition-all duration-300 ease-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;
