import AnimatedCarousel from '../components/AnimatedCarousel'
import CoreServices from '../components/CoreServices'
import KeyFacts from '../components/KeyFacts'
import GlobalNetworkMap from '../components/GlobalNetworkMap'
import hero1 from '../assets/hero-1.webp'
import hero2 from '../assets/hero-2.webp'
import hero3 from '../assets/hero-3.webp'
import hero4 from '../assets/hero-4.webp'

const slides = [
  { 
    image: hero1, 
    title: "Global Freight Solutions", 
    subtitle: "Seamless logistics connecting continents with reliable, efficient freight services worldwide."
  },
  { 
    image: hero2, 
    title: "Supply Chain Excellence", 
    subtitle: "End-to-end supply chain management designed to optimize your business operations."
  },
  { 
    image: hero3, 
    title: "Customs & Compliance", 
    subtitle: "Expert customs brokerage ensuring smooth, compliant international trade."
  },
  { 
    image: hero4, 
    title: "Warehousing Solutions", 
    subtitle: "State-of-the-art warehousing and distribution services for your global inventory."
  },
];

const Home = () => {
  return (
    <div>
        <AnimatedCarousel slides={slides} />
        <CoreServices />
        <KeyFacts />
        <GlobalNetworkMap />
    </div>
  )
}

export default Home