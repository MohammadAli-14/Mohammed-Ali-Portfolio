import React, { Suspense, useEffect } from "react";
import Footer from "./sections/Footer";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Navbar from "./components/NavBar";
import FeatureCards from "./sections/FeatureCards";
import Certifications from "./sections/Certifications";
import About from "./sections/About";
import Hero from "./sections/Hero";

const TechStack = React.lazy(() => import("./sections/TechStack"));
const Contact = React.lazy(() => import("./sections/Contact"));

const App = () => {
  useEffect(() => {
    // Preload certificate image for instant modal viewing
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = "/cert/microsoft-azure-ai-fundamentals.png";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Certifications />
        <FeatureCards />
        <Suspense fallback={null}>
          <TechStack />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;