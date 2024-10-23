export const validateSchema = (schema) => (req, res, next) => {
  try {
    if (req.body && req.body.startDate && req.body.endDate) {
      req.body.startDate = new Date(req.body.startDate);
      req.body.endDate = new Date(req.body.endDate);
    }
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json(error.issues.map((error) => error.message));
  }
};
