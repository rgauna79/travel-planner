import { useForm } from "react-hook-form";
import { useTrip } from "../context/TripContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";

const AddTrip = () => {
  const { addTrip, getTrip, updateTrip } = useTrip();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate("/trips");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm();

  const fetchTrip = async () => {
    if (id) {
      const trip = await getTrip(id);
      if (trip) {
        setValue("name", trip.name);
        setValue("destination", trip.destination);
        setValue("startDate", dayjs(trip.startDate).format("YYYY-MM-DD"));
        setValue("endDate", dayjs(trip.endDate).format("YYYY-MM-DD"));
        setValue("notes", trip.notes);
      } else {
        console.error("Trip not found");
      }
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = async (data) => {
    if (startDate && endDate && dayjs(startDate).isAfter(endDate)) {
      setError("endDate", {
        type: "manual",
        message: "End date must be after start date",
      });
      return;
    }
    try {
      if (id) {
        await updateTrip(id, data);
      } else {
        await addTrip(data);
      }
      navigate("/trips");
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors;
        backendErrors.forEach((err) => {
          setError(err.field, { type: "manual", message: err.message });
        });
      } else {
        console.error("Error adding trip:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Trip" : "Add New Trip"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Trip Name</label>
          <input
            type="text"
            {...register("name", { required: "Trip name is required" })}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Destination</label>
          <input
            type="text"
            {...register("destination", {
              required: "Destination is required",
            })}
            className={`form-control ${errors.destination ? "is-invalid" : ""}`}
          />
          {errors.destination && (
            <div className="invalid-feedback">{errors.destination.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
          />
          {errors.startDate && (
            <div className="invalid-feedback">{errors.startDate.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            {...register("endDate", { required: "End date is required" })}
            className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
          />
          {errors.endDate && (
            <div className="invalid-feedback">{errors.endDate.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea {...register("notes")} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update Trip" : "Add Trip"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-secondary ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
