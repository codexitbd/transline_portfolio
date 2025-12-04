import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactHero from "../components/contact/ContactHero";
import GeneralContactForm from "../components/contact/GeneralContactForm";
import QuoteRequestForm from "../components/contact/QuoteRequestForm";
import ContactInfo from "../components/contact/ContactInfo";
import OfficeMap from "../components/contact/OfficeMap";
import WhyContactUs from "../components/contact/WhyContactUs";
import ContactCTA from "../components/contact/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const formsRef = useRef(null);
  const formsTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Forms section title animation
      gsap.fromTo(
        formsTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formsTitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContactHero />

      {/* Forms Section */}
      <section
        id="contact-forms"
        ref={formsRef}
        className="py-20 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div ref={formsTitleRef} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose the form that best fits your needs. Our team is ready to assist you.
            </p>
          </div>

          {/* Forms Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <GeneralContactForm />
            <QuoteRequestForm />
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <WhyContactUs />

      {/* Contact Information */}
      <ContactInfo />

      {/* Office Maps */}
      <OfficeMap />

      {/* CTA Section */}
      <ContactCTA />
    </main>
  );
};

export default ContactUs;