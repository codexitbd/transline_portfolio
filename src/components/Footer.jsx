import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  TbBrandFacebook,
  TbBrandTwitter,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbMapPin,
  TbPhone,
  TbMail,
  TbArrowUp,
  TbSend,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries-we-serve" },
    { name: "News", path: "/news-and-insights" },
    { name: "Career", path: "/career" },
    { name: "Contact", path: "/contact-us" },
  ];

  const services = [
    "Air Freight",
    "Sea Freight",
    "Road Transport",
    "Customs Brokerage",
    "Warehousing",
    "Supply Chain",
  ];

  const socialLinks = [
    { icon: TbBrandFacebook, href: "#", color: "#1877F2", name: "Facebook" },
    { icon: TbBrandTwitter, href: "#", color: "#1DA1F2", name: "Twitter" },
    { icon: TbBrandLinkedin, href: "#", color: "#0A66C2", name: "LinkedIn" },
    { icon: TbBrandInstagram, href: "#", color: "#E4405F", name: "Instagram" },
  ];

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const content = contentRef.current;

    gsap.set(content, { opacity: 0, y: 20 });

    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative bg-gray-50 border-t border-gray-200">
      {/* Accent top line */}
      <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-blue-500" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Transline</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Global Logistics
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xs">
                Your trusted partner in global freight forwarding and supply chain solutions.
              </p>
              {/* Social Icons */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm"
                    style={{ "--hover-bg": social.color }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = social.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.slice(0, 5).map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 5).map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-start gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <TbMapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                    <span>Gulshan-2, Dhaka, Bangladesh</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8801234567890"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <TbPhone className="w-4 h-4 text-green-500" />
                    <span>+880 1234 567 890</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@transline.com"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <TbMail className="w-4 h-4 text-purple-500" />
                    <span>info@transline.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-3">
                Subscribe for updates & insights.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors cursor-pointer">
                  <TbSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} Transline Global Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 shadow-lg flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-xl transition-all duration-300 z-50 cursor-pointer group ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <TbArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
