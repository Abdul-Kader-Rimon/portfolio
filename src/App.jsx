import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Pages
import Home from "./pages/Home";

// Hooks
import { useAnimation } from "./hooks/useAnimation";
import { useLenis } from "./hooks/useLenis";

function App() {
  const { isLoading } = useAnimation();

  // Initialize Lenis smooth scrolling
  useLenis();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
