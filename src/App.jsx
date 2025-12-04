import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import IndustriesWeServe from "./pages/IndustriesWeServe";
import NewsAndInsights from "./pages/NewsAndInsights";
import Career from "./pages/Career";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries-we-serve" element={<IndustriesWeServe />} />
        <Route path="/news-and-insights" element={<NewsAndInsights />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
