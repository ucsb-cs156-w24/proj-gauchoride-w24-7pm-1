import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import headerImg from "../../../assets/stork.png"
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost"

function isParticipant(currentUser) {
  return (
    hasRole(currentUser, "ROLE_ADMIN")
    || hasRole(currentUser, "ROLE_DRIVER")
    || hasRole(currentUser, "ROLE_RIDER")
  );
}

function createRideRequest(currentUser) {
  if (hasRole(currentUser, "ROLE_RIDER") || hasRole(currentUser, "ROLE_ADMIN")) {
    return (<NavDropdown.Item data-testid="appnavbar-ride-create-dropdown" as={Link} to="/ride/create">Request Ride</NavDropdown.Item>)
  } else {
    return (<div data-testid="NO-appnavbar-ride-create-dropdown"></div>)
  }
}

export default function AppNavbar({ currentUser, systemInfo, doLogout, currentUrl = window.location.href }) {
  const styles = {
    navbar: {
      backgroundColor: "#003660",
    }
  }

  return (
    <>
      {
        (currentUrl.startsWith("http://localhost:3000") || currentUrl.startsWith("http://127.0.0.1:3000")) && (
          <AppNavbarLocalhost url={currentUrl} />
        )
      }

      <Navbar expand="xl" variant="dark" sticky="top" data-testid="AppNavbar" style={styles.navbar}>
        <Container>
        <img data-testid="gauchoride-nav-logo" src={headerImg} alt="" style={{width: 80, height: 80, marginRight: 15}} />

          <Navbar.Brand as={Link} to="/">
            GauchoRide
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid */}
          </>

          <Navbar.Collapse>
            {/* This `nav` component contains all navigation items that show up on the left side */}
            <Nav className="me-auto" >
              {
                systemInfo?.springH2ConsoleEnabled && (
                  <>
                    <Nav.Link href="/h2-console">H2Console</Nav.Link>
                  </>
                )
              }
              {
                systemInfo?.showSwaggerUILink && (
                  <>
                    <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                  </>
                )
              }
              {
                hasRole(currentUser, "ROLE_ADMIN") && (
                  <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown" >
                    <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                isParticipant(currentUser) && (
                  <NavDropdown title="Shift" id="appnavbar-shift-dropdown" data-testid="appnavbar-shift-dropdown" >
                    <NavDropdown.Item as={Link} to="/shift/list">Driver shift table</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                isParticipant(currentUser) && (
                  <NavDropdown title="Ride Request" id="appnavbar-ride-dropdown" data-testid="appnavbar-ride-dropdown" >
                    <NavDropdown.Item data-testid="appnavbar-ride-dropdown-rides" as={Link} to="/ride/">Rides</NavDropdown.Item>
                    { createRideRequest(currentUser) }
                  </NavDropdown>
                )
              }
            </Nav>

            <Nav className="ml-auto">
              {/* This `nav` component contains all navigation items that show up on the right side */}
              {
                currentUser && currentUser.loggedIn ? (
                  <>
                    <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.fullName}</Navbar.Text>
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
    </>
  );
}
