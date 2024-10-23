import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      className="container mt-5 d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">Welcome to PlanMyTrip</h1>
        <p className="lead">
          Plan your trips, manage activities, and track expenses effortlessly!
        </p>
      </div>
      <div>
        <button
          className="btn btn-primary btn-lg mx-2"
          onClick={() => navigate("/trips")}
        >
          View My Trips
        </button>
        {!isAuthenticated && (
          <button
            className="btn btn-outline-secondary btn-lg mx-2"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
