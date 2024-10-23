import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri"; // Asegúrate de tener react-icons instalados

const TripDetailPage = () => {
  const { id } = useParams();
  const { getTrip, deleteTrip } = useTrip();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await getTrip(id);
        setTrip(response);
      } catch (error) {
        console.error(error);
        setError("Error fetching trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [id, getTrip]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
      navigate("/trips"); // Regresar a la lista de viajes después de eliminar
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading trip details...</div>;
  }

  if (error) {
    return <div className="container mt-5">{error}</div>;
  }

  if (!trip) {
    return <div className="container mt-5">No trip found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{trip.name}</h2>
      <p>
        <strong>Destination:</strong> {trip.destination}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(trip.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Notes:</strong> {trip.notes || "No additional notes"}
      </p>

      <h3 className="mt-4">Activities</h3>
      <ul className="list-group">
        {trip.activities && trip.activities.length > 0 ? (
          trip.activities.map((activity) => (
            <li key={activity._id} className="list-group-item">
              {activity.name} - {new Date(activity.date).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li className="list-group-item">No activities found</li>
        )}
      </ul>

      <h3 className="mt-4">Expenses</h3>
      <ul className="list-group">
        {trip.expenses && trip.expenses.length > 0 ? (
          trip.expenses.map((expense) => (
            <li key={expense._id} className="list-group-item">
              {expense.description} - ${expense.amount}
            </li>
          ))
        ) : (
          <li className="list-group-item">No expenses found</li>
        )}
      </ul>

      <div className="mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-secondary me-2">
          Go Back
        </button>
        <button onClick={handleDelete} className="btn btn-danger me-2">
          <RiDeleteBin6Line /> Delete
        </button>
        <button
          onClick={() => navigate(`/edit-trip/${trip._id}`)}
          className="btn btn-warning"
        >
          <RiEdit2Line /> Edit
        </button>
      </div>
    </div>
  );
};

export default TripDetailPage;
