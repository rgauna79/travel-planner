import Activity from "../models/activity.model.js";

// Create Activity
export const createActivity = async (req, res) => {
  try {
    const { travelId, name, date, category, location } = req.body;

    const activity = new Activity({
      travelId,
      name,
      date,
      category,
      location,
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Activity creation failed." });
  }
};

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("travelId");
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activities." });
  }
};

// Get Activity by Id
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity." });
  }
};

// Update Activity
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Activity update failed." });
  }
};

// Delete Activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }
    res.status(200).json({ message: "Activity deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Activity deletion failed." });
  }
};
