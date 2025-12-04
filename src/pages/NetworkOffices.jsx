import React from "react";
import NetworkHero from "../components/network/NetworkHero";
import GlobalPresence from "../components/network/GlobalPresence";
import OfficeLocations from "../components/network/OfficeLocations";
import RegionalCoverage from "../components/network/RegionalCoverage";
import PartnerNetwork from "../components/network/PartnerNetwork";
import ShippingPartners from "../components/network/ShippingPartners";
import AirlinePartners from "../components/network/AirlinePartners";
import NetworkBenefits from "../components/network/NetworkBenefits";
import GlobalNetworkMap from "../components/GlobalNetworkMap";

const NetworkOffices = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <NetworkHero />

      {/* Global Presence Map */}
      <GlobalNetworkMap />

      {/* Office Locations */}
      <OfficeLocations />

      {/* Regional Coverage in Bangladesh */}
      <RegionalCoverage />

      {/* International Agent Partners */}
      <PartnerNetwork />

      {/* Shipping Line Partners */}
      <ShippingPartners />

      {/* Airline Cargo Partners */}
      <AirlinePartners />

      {/* Network Benefits */}
      <NetworkBenefits />
    </main>
  );
};

export default NetworkOffices;
