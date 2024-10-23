import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import TripsPage from "./pages/TripsPage";
import TripDetailPage from "./pages/TripDetailPage";
import Navbar from "./components/Navbar";
import TripFormPage from "./pages/TripFormPage.jsx";
import { TripProvider } from "./context/TripContext.jsx";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <TripProvider>
      <div className={theme}>
        <Router>
          <div className="container d-flex flex-column">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/trips/:id" element={<TripDetailPage />} />
              <Route path="/add-trip" element={<TripFormPage />} />
              <Route path="/edit-trip/:id" element={<TripFormPage />} />

              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </TripProvider>
  );
}

export default App;
