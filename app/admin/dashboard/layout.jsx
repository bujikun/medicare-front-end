import NavBar from "@/components/navigation/NavBar"
import SideBar from "@/components/navigation/SideBar";
import SideBarBackDrop from "@/components/navigation/SideBarBackDrop";
import { Container } from "@/wrapper/chakra/ui"

const DashboardLayout = ({children}) => {
  return (
    <Container maxW="2000px" h="100%">
      <NavBar />
      <SideBar />
      <SideBarBackDrop/>
      <main style={{ marginTop: "4rem", height: "calc(100vh - 64px)" }}>
        {children}
      </main>
    </Container>
  );
}
export default DashboardLayout