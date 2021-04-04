import { Container, Navbar as BootstrapNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <BootstrapNavbar expand="xl" variant="dark" bg="dark" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Kitchen Sink
        </BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  );
}