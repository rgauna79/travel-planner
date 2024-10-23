import User from "../models/user.model.js";
import Trip from "../models/trip.model.js";

export const createTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, destination, startDate, endDate, notes } = req.body;
    const userFound = await User.findById(userId);
    if (userFound) {
      const trip = new Trip({
        userId,
        name,
        destination,
        startDate,
        endDate,
        notes,
      });
      trip.save();
      res.status(200).json(trip);
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed creating trip" });
  }
};

// get all trips
export const getTrips = async (req, res) => {
  try {
    //filter data with select
    const trips = await Trip.find({
      userId: req.user.id,
    })
      .select("name destination startDate endDate notes expenses activities")
      .populate("userId");

    //filter user data
    // const trips = await Trip.find({
    //   userId: req.user.id,
    // }).populate({
    //   path: "userId",
    //   select: "first_name last_name email",
    // });

    // filtering with map
    // const tripsFiltered = trips.map((trip) => ({
    //   name: trip.name,
    //   destination: trip.destination,
    //   startDate: trip.startDate,
    //   endDate: trip.endDate,
    //   notes: trip.notes,
    //   expenses: trip.notes,
    //   activities: trip.activities,
    // }));

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips." });
  }
};

//get travel by id
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("userId");
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trip." });
  }
};

//update travel
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: "Trip update failed." });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }
    res.status(200).json({ message: "Trip deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Trip deletion failed." });
  }
};
