"use client"
import SideBar from "@/components/navigation/SideBar";
import styles from "@/components/navigation/aside.module.css"
import { useDashboardContext } from "@/contexts/DashboardContext";
const Aside = () => {
    const { isDrawerOpen} = useDashboardContext();
  return (
    <aside className={isDrawerOpen ? styles.aside : styles.aside_hidden}>
      <SideBar />
    </aside>
  ); 
}
export default Aside