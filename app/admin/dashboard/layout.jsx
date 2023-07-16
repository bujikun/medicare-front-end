import NavBar from "@/components/navigation/NavBar"
import SideBar from "@/components/navigation/SideBar";
import styles from "@/app/admin/dashboard/dashboard.module.css"
import DashboardContext from "@/contexts/DashboardContext";
import Aside from "@/components/navigation/Aside";
import {getServerSession} from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }) => {
  const session = getServerSession(authOptions);
  return (
    <div
      style={{
        maxWidth: "2000px",
      }}
    >
      <div className={styles.wrapper}>
        <DashboardContext>
         <Aside/>
          <main className={styles.main}>
            <NavBar />
            {children}
          </main>
        </DashboardContext>
      </div>
    </div>
  );
}
export default DashboardLayout