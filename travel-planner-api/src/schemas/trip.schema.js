import z from "zod";

export const tripSchema = z.object({
  name: z.string({ required_error: "Name of trip is required" }),
  destination: z.string({ required_error: "Destination is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
});
