import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";

const MyNavbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <strong>PlanMyTrip</strong>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <LinkContainer to="/trips">
                  <Nav.Link className="text-center text-nowrap my-2">
                    My Trips
                  </Nav.Link>
                </LinkContainer>
                <Button
                  onClick={handleLogout}
                  variant={theme === "dark" ? "outline-light" : "outline-dark"}
                  className="w-100 my-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-center text-nowrap my-2">
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-center text-nowrap my-2">
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            <div className="theme-toggle text-center d-flex align-items-center my-2">
              <FaSun className="my-2" />
              <div
                className={`theme-slider ${theme === "dark" ? "active" : ""}`}
                onClick={toggleTheme}
              >
                <div className="slider-circle"></div>
              </div>
              <FaMoon className="ms-2" />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
