import NavBar from "@/components/navigation/NavBar"
import SideBar from "@/components/navigation/SideBar";
import DashboardContext from "@/contexts/DashboardContext";
import { Container } from "@/wrapper/chakra/ui"

const DashboardLayout = ({children}) => {
  return (
    <Container
      sx={{
        maxW: "2000px",
      }}
    >
      <DashboardContext>
        <NavBar />
        <SideBar />
      </DashboardContext>
      <main style={{ marginTop: "4rem", height: "calc(100vh - 64px)" }}>
        {children}
      </main>
    </Container>
  );
}
export default DashboardLayout