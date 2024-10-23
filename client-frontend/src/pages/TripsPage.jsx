import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTrip } from "../context/TripContext";

const TripsPage = () => {
  const { trips, loading, error, getTrips } = useTrip();

  useEffect(() => {
    getTrips();
  }, [getTrips]);

  if (loading) {
    return <div className="container mt-5">Loading trips...</div>;
  }

  if (error) {
    return <div className="container mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Trips</h2>
      <Link to="/add-trip" className="btn btn-primary mb-4">
        Add New Trip
      </Link>
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
