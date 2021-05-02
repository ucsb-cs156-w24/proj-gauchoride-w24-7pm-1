import { Container } from "react-bootstrap";
import Footer from "main/components/Nav/Footer";
import AppNavbar from "main/components/Nav/AppNavbar";
import { useCurrentUser, useLogout} from "main/utils/currentUser";

export default function BasicLayout({ children }) {

  const { data: currentUser } = useCurrentUser();
  const doLogout = useLogout().mutate;

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar currentUser={currentUser} doLogout={doLogout} />
      <Container expand="xl" className="pt-4 flex-grow-1">
        {children}
      </Container>
      <Footer />
    </div>
  );
}