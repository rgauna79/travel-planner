import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TripDetailPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`/api/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTripDetails();
  }, [id]);

  if (!trip) {
    return <div className="container mt-5">Loading trip details...</div>;
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

      {/* Aquí puedes agregar secciones para mostrar actividades y gastos relacionados */}
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
    </div>
  );
};

export default TripDetailPage;
