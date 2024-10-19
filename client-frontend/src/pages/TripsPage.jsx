import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TripsPage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("/api/trips");
        setTrips(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrips();
  }, []);
  if (trips.length > 0) {
    return (
      <div>
        <h1>No trips</h1>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Trips</h2>
      {trips.length === 0 ? (
        <p>No trips found. Start planning your first trip!</p>
      ) : (
        <div className="list-group">
          {trips.map((trip) => (
            <Link
              key={trip._id}
              to={`/trips/${trip._id}`}
              className="list-group-item list-group-item-action"
            >
              {trip.name} - {trip.destination}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
