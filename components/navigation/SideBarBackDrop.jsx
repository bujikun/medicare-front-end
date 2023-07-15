"use client";
import styles from "@/components/navigation/navigation.module.css";
import { useDashboardContext } from "@/contexts/DashboardContext";
const SideBarBackDrop = () => {
  const { isDrawerOpen, setIsDrawerOpen, isSmallScreen } =
    useDashboardContext();
  return (
    <>
      {isDrawerOpen && isSmallScreen ? (
        <div
          className={styles.backdrop}
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};
export default SideBarBackDrop;
