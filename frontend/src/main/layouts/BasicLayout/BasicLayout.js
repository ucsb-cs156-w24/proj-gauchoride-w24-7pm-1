import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function BasicLayout(props) {
  const { children } = props;
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container expand="xl" className="pt-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}