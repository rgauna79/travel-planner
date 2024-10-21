import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be 6 or more characters long" })
    .max(24, { message: "Password must be 24 or less characters long" }),
});

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, { message: "Username must be 3 or more characters long" })
    .max(12, { message: "Username must be 24 or less characters long" }),
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(2, { message: "First name  must be 3 or more characters long" })
    .max(12, { message: "First name must be 24 or less characters long" }),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(2, { message: "Last name must be 3 or more characters long" })
    .max(12, { message: "Last name must be 24 or less characters long" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be 6 or more characters long" })
    .max(24, { message: "Password must be 24 or less characters long" }),
});
