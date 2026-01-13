import React, { createContext, useContext } from "react";
import { useLenis } from "../../hooks/useLenis";

const SmoothScrollContext = createContext(null);

/**
 * Provider component for smooth scrolling context
 * Ensures Lenis is initialized once at the app level
 */
export const SmoothScrollProvider = ({ children }) => {
  const lenis = useLenis();

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

/**
 * Hook to access Lenis instance from context
 */
export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  return context;
};

export default SmoothScrollProvider;
