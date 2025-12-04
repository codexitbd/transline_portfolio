import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbBuilding,
  TbPhone,
  TbMail,
  TbClock,
  TbMapPin,
  TbUsers,
  TbFileText,
  TbCreditCard,
  TbHeadset,
  TbSettings,
  TbShip,
  TbPlane,
  TbBuildingFactory,
  TbArrowRight,
} from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const OfficeLocations = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const [activeOffice, setActiveOffice] = useState(0);

  const offices = [
    {
      id: "dhaka",
      name: "Head Office - Dhaka",
      type: "Head Office",
      address: {
        building: "Trans Line Tower",
        road: "House 42, Road 12, Block E",
        area: "Banani Commercial Area",
        city: "Dhaka 1213",
        country: "Bangladesh",
      },
      contact: {
        phone: "+880-2-9821234",
        mobile: "+880-1711-123456",
        email: "info@translinebd.com",
        fax: "+880-2-9821235",
      },
      hours: {
        weekdays: "Saturday - Thursday: 9:00 AM - 6:00 PM",
        weekend: "Friday: Closed",
        emergency: "+880-1711-999999",
      },
      departments: [
        { icon: TbHeadset, name: "Customer Service" },
        { icon: TbSettings, name: "Operations" },
        { icon: TbFileText, name: "Customs Clearance" },
        { icon: TbFileText, name: "Documentation" },
        { icon: TbCreditCard, name: "Accounts & Billing" },
        { icon: TbUsers, name: "Management" },
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5!2d90.4!3d23.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzI0LjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890",
      color: "orange",
    },
    {
      id: "chittagong",
      name: "Branch Office - Chittagong",
      type: "Branch Office",
      address: {
        building: "Port View Complex",
        road: "Agrabad Commercial Area",
        area: "Near CEPZ Gate",
        city: "Chittagong 4100",
        country: "Bangladesh",
      },
      contact: {
        phone: "+880-31-2520123",
        mobile: "+880-1811-123456",
        email: "ctg@translinebd.com",
        fax: "+880-31-2520124",
      },
      hours: {
        weekdays: "Saturday - Thursday: 9:00 AM - 6:00 PM",
        weekend: "Friday: Closed",
        emergency: "+880-1811-999999",
      },
      departments: [
        { icon: TbHeadset, name: "Customer Service" },
        { icon: TbSettings, name: "Operations" },
        { icon: TbShip, name: "Port Operations" },
        { icon: TbFileText, name: "Documentation" },
      ],
      proximity: [
        { icon: TbShip, name: "Chittagong Port", distance: "3 km" },
        { icon: TbPlane, name: "Shah Amanat Airport", distance: "8 km" },
        { icon: TbBuildingFactory, name: "CEPZ", distance: "1 km" },
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.5!2d91.8!3d22.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE5JzQ4LjAiTiA5McKwNDgnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890",
      color: "blue",
    },
  ];

  const colorClasses = {
    orange: { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-500", border: "border-orange-200" },
    blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500", border: "border-blue-200" },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".animate-heading"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tabs animation
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current.querySelectorAll(".office-tab"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Content animation on tab change
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(".animate-content");
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [activeOffice]);

  const activeData = offices[activeOffice];
  const colors = colorClasses[activeData.color];

  return (
    <section ref={sectionRef} id="offices" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <span className="animate-heading inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
            <TbBuilding className="w-4 h-4" />
            Our Offices
          </span>
          <h2 className="animate-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Locations
          </h2>
          <p className="animate-heading text-gray-600 max-w-2xl mx-auto text-lg">
            Strategically located offices to serve you better across Bangladesh.
          </p>
        </div>

        {/* Office Tabs */}
        <div ref={tabsRef} className="flex justify-center gap-4 mb-10">
          {offices.map((office, index) => {
            const isActive = activeOffice === index;
            const tabColors = colorClasses[office.color];
            return (
              <button
                key={office.id}
                onClick={() => setActiveOffice(index)}
                className={`office-tab flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? `${tabColors.bg} text-white shadow-lg`
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <TbBuilding className="w-5 h-5" />
                <span className="hidden sm:inline">{office.name}</span>
                <span className="sm:hidden">{office.type}</span>
              </button>
            );
          })}
        </div>

        {/* Office Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left - Office Details */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                  <TbMapPin className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="font-bold text-gray-900">Address</h3>
              </div>
              <div className="text-gray-600 leading-relaxed pl-13">
                <p className="font-semibold text-gray-900">{activeData.address.building}</p>
                <p>{activeData.address.road}</p>
                <p>{activeData.address.area}</p>
                <p>{activeData.address.city}, {activeData.address.country}</p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                  <TbPhone className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="font-bold text-gray-900">Contact Information</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <TbPhone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-gray-900 font-medium">{activeData.contact.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TbPhone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Mobile</div>
                    <div className="text-gray-900 font-medium">{activeData.contact.mobile}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TbMail className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-gray-900 font-medium">{activeData.contact.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TbPhone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Fax</div>
                    <div className="text-gray-900 font-medium">{activeData.contact.fax}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                  <TbClock className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="font-bold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{activeData.hours.weekdays}</span>
                  <span className="text-emerald-500 text-sm font-medium">Open</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{activeData.hours.weekend}</span>
                  <span className="text-red-500 text-sm font-medium">Closed</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-orange-600">
                    <TbPhone className="w-4 h-4" />
                    <span className="text-sm font-medium">24/7 Emergency: {activeData.hours.emergency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                  <TbUsers className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="font-bold text-gray-900">Departments Available</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {activeData.departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                      <span className="text-sm text-gray-700">{dept.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proximity (for Chittagong) */}
            {activeData.proximity && (
              <div className="animate-content bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center`}>
                    <TbMapPin className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="font-bold text-gray-900">Proximity to Key Locations</h3>
                </div>
                <div className="space-y-3">
                  {activeData.proximity.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                          <span className="text-gray-700 font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{item.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right - Map */}
          <div className="animate-content">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm h-full min-h-[400px]">
              <div className="relative w-full h-full min-h-[380px] rounded-xl overflow-hidden bg-gray-100">
                {/* Map Placeholder - Replace with actual Google Maps embed */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${colors.light} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <TbMapPin className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{activeData.name}</h4>
                    <p className="text-sm text-gray-500 mb-4">{activeData.address.area}</p>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(
                        `${activeData.address.building} ${activeData.address.area} ${activeData.address.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      View on Google Maps
                      <TbArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
