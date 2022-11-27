import { createContext, useState, useEffect } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // Get client width for responsive layout
  const breakPoint = 520;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  // Update width whenever user resizes the window
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = window.innerWidth;
      setIsMobile(width < breakPoint);
    });
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
