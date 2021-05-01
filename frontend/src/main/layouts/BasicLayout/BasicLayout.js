import { Container } from "react-bootstrap";
import Footer from "main/components/Nav/Footer";
import AppNavbar from "main/components/Nav/AppNavbar";

export default function BasicLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container expand="xl" className="pt-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}