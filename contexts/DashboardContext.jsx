"use client";
import { useMediaQuery } from "@/wrapper/chakra/ui";
import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const DashboardContext = ({ children }) => {
  const smallScreen = useMediaQuery("(max-width: 769px)", {
    ssr: true,
    fallback: true,
  });
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    
  return (
    <Context.Provider value={{ isSmallScreen: smallScreen[0],isDrawerOpen ,setIsDrawerOpen }}>
      {children}
    </Context.Provider>
  );
};

export const useDashboardContext = () => useContext(Context);
export default DashboardContext;
