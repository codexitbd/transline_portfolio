import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TbPhone, TbArrowRight, TbQuestionMark } from "react-icons/tb";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const faqQuestions = [
  { question: "What documents do I need for customs clearance?", link: "/faq#customs" },
  { question: "How long does ocean freight take?", link: "/faq#ocean" },
  { question: "Do you offer door-to-door service?", link: "/faq#door-to-door" },
  { question: "How is shipping cost calculated?", link: "/faq#pricing" },
];

const ContactCTA = () => {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // FAQ animation
      gsap.fromTo(
        faqRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* FAQ Quick Links */}
        <div ref={faqRef} className="mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
              <TbQuestionMark className="w-4 h-4" />
              FAQ
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Before You Contact Us
            </h3>
            <p className="text-gray-600">
              You might find your answer in our frequently asked questions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {faqQuestions.map((faq, index) => (
              <Link
                key={index}
                to={faq.link}
                className="group p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300"
              >
                <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-300 flex items-start gap-2">
                  <TbQuestionMark className="w-4 h-4 shrink-0 mt-0.5" />
                  {faq.question}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Call CTA */}
        <div
          ref={ctaRef}
          className="relative bg-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#cta-grid)" />
            </svg>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prefer to Call?
              </h2>
              <p className="text-gray-300 text-lg max-w-xl">
                Speak directly with our logistics experts. We're here to answer
                your questions and help you find the best shipping solutions.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
              <a
                href="tel:+8801911123456"
                className="group inline-flex items-center gap-4 px-8 py-5 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TbPhone className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-orange-100 mb-1">Call Us Now</p>
                  <p className="text-2xl font-bold">+880 1911-123456</p>
                </div>
                <TbArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <p className="text-gray-400 text-sm">
                Available 24/7 for emergencies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
