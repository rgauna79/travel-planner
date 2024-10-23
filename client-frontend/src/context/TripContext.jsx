import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getTripsRequest,
  getTripRequest,
  addTripRequest,
  updateTripRequest,
  deleteTripRequest,
} from "../api/trip.js";

const TripContext = createContext();

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used in TripProvider");
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTripsRequest();
      setTrips(response.data);
    } catch (error) {
      console.error(error);
      setError("Error fetching trips");
    } finally {
      setLoading(false);
    }
  }, []);

  const getTrip = useCallback(async (id) => {
    try {
      const response = await getTripRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching trip");
    }
  }, []);

  const addTrip = useCallback(async (tripData) => {
    try {
      const response = await addTripRequest(tripData);
      setTrips((prevTrips) => [...prevTrips, response.data]);
    } catch (error) {
      console.error(error);
      setError("Error adding trip");
    }
  }, []);

  const updateTrip = useCallback(async (id, tripData) => {
    try {
      console.log("tripData", tripData);
      const response = await updateTripRequest(id, tripData);
      setTrips((prevTrips) =>
        prevTrips.map((trip) => (trip._id === id ? response.data : trip))
      );
    } catch (error) {
      console.error(error);
      setError("Error updating trip");
    }
  }, []);

  const deleteTrip = useCallback(async (id) => {
    try {
      await deleteTripRequest(id);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
    } catch (error) {
      console.error(error);
      setError("Error deleting trip");
    }
  }, []);

  return (
    <TripContext.Provider
      value={{
        trips,
        loading,
        error,
        getTrip,
        getTrips,
        addTrip,
        updateTrip,
        deleteTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
