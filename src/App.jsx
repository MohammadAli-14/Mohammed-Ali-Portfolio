import { useEffect } from "react";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Navbar from "./components/NavBar";
import FeatureCards from "./sections/FeatureCards";
import Certifications from "./sections/Certifications";
import About from "./sections/About";

const App = () => {
  useEffect(() => {
    // Only preload certificate image
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = '/cert/microsoft-azure-ai-fundamentals.png';
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
         <About /> 
        <Projects />
        <Education />
        <Certifications />
        <FeatureCards />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;