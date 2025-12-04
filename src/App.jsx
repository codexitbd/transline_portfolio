import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import IndustriesWeServe from "./pages/IndustriesWeServe";
import NewsAndInsights from "./pages/NewsAndInsights";
import Career from "./pages/Career";
import ContactUs from "./pages/ContactUs";

// Service Detail Pages
import FreightForwarding from "./pages/services/FreightForwarding";
import WarehousingCFS from "./pages/services/WarehousingCFS";
import CustomsBrokerage from "./pages/services/CustomsBrokerage";
import SupplyChainManagement from "./pages/services/SupplyChainManagement";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/freight-forwarding" element={<FreightForwarding />} />
        <Route path="/services/warehousing" element={<WarehousingCFS />} />
        <Route path="/services/customs-brokerage" element={<CustomsBrokerage />} />
        <Route path="/services/supply-chain" element={<SupplyChainManagement />} />
        <Route path="/industries-we-serve" element={<IndustriesWeServe />} />
        <Route path="/news-and-insights" element={<NewsAndInsights />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
