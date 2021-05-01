import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser, useLogout, hasRole} from "main/utils/currentUser";


export default function AppNavbar() {
  const { data: currentUser } = useCurrentUser();
  const doLogout = useLogout();

  console.log('currentUser', currentUser);
  return (
    <Navbar expand="xl" variant="dark" bg="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Kitchen Sink
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-between">
          <Nav className="mr-auto">
            {
              hasRole(currentUser,"ROLE_ADMIN") && (
                <NavDropdown title="Admin" id="appnavbar-admin-dropdown">
                  <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                </NavDropdown>
              )
            }
          </Nav>

          <Nav className="ml-auto">
            {
              currentUser && currentUser.loggedIn ? (
                <>
                  <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                  <Button onClick={doLogout}>Log Out</Button>
                </>
              ) : (
                <Button href="/oauth2/authorization/google">Log In</Button>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  );
}