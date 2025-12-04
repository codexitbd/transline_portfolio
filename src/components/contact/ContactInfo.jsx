import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbMapPin,
  TbPhone,
  TbMail,
  TbClock,
  TbAlertCircle,
  TbBrandFacebook,
  TbBrandLinkedin,
  TbBrandYoutube,
  TbBrandTwitter,
  TbExternalLink,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    id: 1,
    name: "Head Office - Dhaka",
    address: "House 45, Road 12, Block D, Banani, Dhaka-1213, Bangladesh",
    phone: "+880-2-8835678",
    mobile: "+880-1711-123456",
    email: "info@transline.com.bd",
    fax: "+880-2-8835679",
    hours: "Saturday - Thursday: 9:00 AM - 6:00 PM",
    closed: "Friday: Closed",
    emergency: "+880-1911-123456",
    mapUrl: "https://maps.google.com/?q=23.7934,90.4008",
  },
  {
    id: 2,
    name: "Chittagong Office",
    address: "Floor 5, Port Tower, Agrabad C/A, Chittagong-4100, Bangladesh",
    phone: "+880-31-2856789",
    mobile: "+880-1811-654321",
    email: "ctg@transline.com.bd",
    fax: "+880-31-2856790",
    hours: "Saturday - Thursday: 9:00 AM - 6:00 PM",
    closed: "Friday: Closed",
    emergency: "+880-1911-654321",
    mapUrl: "https://maps.google.com/?q=22.3384,91.8317",
  },
];

const departments = [
  { name: "Operations", email: "operations@transline.com.bd" },
  { name: "Customs", email: "customs@transline.com.bd" },
  { name: "Accounts", email: "accounts@transline.com.bd" },
  { name: "Careers", email: "careers@transline.com.bd" },
  { name: "Partnerships", email: "partnerships@transline.com.bd" },
];

const socialLinks = [
  { icon: TbBrandFacebook, url: "https://facebook.com/transline", label: "Facebook" },
  { icon: TbBrandLinkedin, url: "https://linkedin.com/company/transline", label: "LinkedIn" },
  { icon: TbBrandYoutube, url: "https://youtube.com/@transline", label: "YouTube" },
  { icon: TbBrandTwitter, url: "https://twitter.com/transline", label: "Twitter" },
];

const ContactInfo = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const socialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate office cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Animate social section
      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbMapPin className="w-4 h-4" />
            Our Locations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Visit us at our offices or reach out through any of the channels below.
          </p>
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {offices.map((office, index) => (
            <div
              key={office.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              {/* Office Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {office.name}
                  </h3>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-orange-600 hover:underline"
                  >
                    Get Directions
                    <TbExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <TbMapPin className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <TbMapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-gray-600">{office.address}</p>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <TbPhone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">{office.phone}</p>
                    <p className="text-gray-600 text-sm">Mobile: {office.mobile}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <TbMail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-gray-900 hover:text-orange-600 transition-colors duration-300"
                  >
                    {office.email}
                  </a>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3">
                  <TbClock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-gray-900">{office.hours}</p>
                    <p className="text-gray-500 text-sm">{office.closed}</p>
                  </div>
                </div>

                {/* Emergency Hotline */}
                <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                  <TbAlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">24/7 Emergency Hotline</p>
                    <a
                      href={`tel:${office.emergency}`}
                      className="text-red-600 font-semibold hover:underline"
                    >
                      {office.emergency}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Department Contacts */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Department Direct Contacts</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {departments.map((dept) => (
              <a
                key={dept.name}
                href={`mailto:${dept.email}`}
                className="group p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300"
              >
                <p className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                  {dept.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{dept.email}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div
          ref={socialRef}
          className="text-center"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Connect With Us</h3>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
