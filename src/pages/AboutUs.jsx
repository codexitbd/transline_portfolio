import React from "react";
import PageHeader from "../components/PageHeader";
import CompanyProfile from "../components/about/CompanyProfile";
import MissionVisionValues from "../components/about/MissionVisionValues";
import CertificationsMarquee from "../components/about/CertificationsMarquee";
import CorporateTimeline from "../components/about/CorporateTimeline";
import LeadershipTeam from "../components/about/LeadershipTeam";
import OurInfrastructure from "../components/about/OurInfrastructure";
import WhyChooseUs from "../components/about/WhyChooseUs";

const AboutUs = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="Building Bridges in Global Trade Since 2005"
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
      />

      {/* Company Profile Section */}
      <CompanyProfile />

      {/* Mission, Vision & Values Section */}
      <MissionVisionValues />

      {/* Certifications & Accreditations */}
      <CertificationsMarquee />

      {/* Corporate History Timeline */}
      <CorporateTimeline />

      {/* Leadership Team */}
      <LeadershipTeam />

      {/* Our Infrastructure */}
      <OurInfrastructure />

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
};

export default AboutUs;