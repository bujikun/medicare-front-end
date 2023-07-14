import NavBar from "@/components/navigation/NavBar"
import { Container } from "@/wrapper/chakra/ui"

const DashboardLayout = ({children}) => {
  return (
      <Container maxW="2000px">
          <NavBar/>
      {children}
      </Container>
  )
}
export default DashboardLayout