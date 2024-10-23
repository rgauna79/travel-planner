import axios from "./config";

export const getTripsRequest = () => axios.get("api/trips");

export const getTripRequest = (id) => axios.get(`api/trips/${id}`);

export const addTripRequest = (trip) => axios.post("api/trips", trip);

export const updateTripRequest = (id, trip) =>
  axios.put(`api/trips/${id}`, trip);

export const deleteTripRequest = (id) => axios.delete(`api/trips/${id}`);
