<<<<<<< HEAD
import User from "../models/user.model.js";
import Trip from "../models/trip.model.js";

=======
import Trip from "../models/trip.js";
import User from "../models/user.js";

// create a Trip
>>>>>>> b1ddb43 (add: trip controller)
export const createTrip = async (req, res) => {
  try {
    const { userId, name, destination, startDate, endDate, notes } = req.body;

<<<<<<< HEAD
    const userFound = await User.findById(userId);
    if (userFound) {
=======
    const existingUser = await User.findById({ userId });
    if (existingUser) {
>>>>>>> b1ddb43 (add: trip controller)
      const trip = new Trip({
        userId,
        name,
        destination,
        startDate,
        endDate,
        notes,
      });
<<<<<<< HEAD

      trip.save();
      res.status(200).json(trip);
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed creating trip" });
=======
      await trip.save();
      res.status(201).json(trip);
    } else {
      return res.status(400).json({ error: "Invalid User" });
    }
  } catch (error) {
    res.status(500).json({ error: "Trip creation failed."})
>>>>>>> b1ddb43 (add: trip controller)
  }
};

// get all trips
<<<<<<< HEAD
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("userId");
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
=======
export const getTrips = async(req,res) => {
  
}

>>>>>>> b1ddb43 (add: trip controller)
