"use client";
import { useMediaQuery } from "@/wrapper/chakra/ui";
import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const DashboardContext = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const isSmallScreen = useMediaQuery("screen and (min-width: 768px)", {
    ssr:true, fallback:true
  });
  return (
    <Context.Provider value={{isDrawerOpen ,setIsDrawerOpen,isSmallScreen:isSmallScreen[0] }}>
      {children}
    </Context.Provider>
  );
};

export const useDashboardContext = () => useContext(Context);
export default DashboardContext;
