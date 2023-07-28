import NavBar from "@/components/navigation/NavBar";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import DashboardContext from "@/contexts/DashboardContext";
import Aside from "@/components/navigation/Aside";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export const dynamic = "force-dynamic";

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const active = session?.active ?? false;
  if (session?.role !== "ADMIN") {
    console.log("ROLE", session?.role);
    redirect("/auth/signin?error=You can not access this page", "replace");
    signOut();
  }
  if (!active) {
    redirect("/auth/signin","replace");
  }
  
  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <div className={styles.wrapper}>
        <DashboardContext>
          <Aside />
          <main className={styles.main}>
            <div className={styles.nav_container}>
              <NavBar />
            </div>
            <div className={styles.children}>
                {children}
            </div>
          </main>
        </DashboardContext>
      </div>
    </div>
  );
};
export default DashboardLayout;
