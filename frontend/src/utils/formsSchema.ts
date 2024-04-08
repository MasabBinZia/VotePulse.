import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.string().refine(
    (value) => {
      const numericValue = parseInt(value, 10);
      return !isNaN(numericValue) && numericValue >= 18 && numericValue <= 100;
    },
    {
      message: "Age must be a number between 18 and 100.",
    }
  ),
  cparty: z.string().min(3, {
    message: "Party name must be at least 3 characters.",
  }),
  cnicNumber: z.string().refine(
    (value) => {
      const cnicRegex = /^\d{5}-\d{7}-\d$/;
      const numericValue = parseInt(value.replace(/-/g, ""), 10);
      return (
        cnicRegex.test(value) && !isNaN(numericValue) && value.length === 15
      );
    },
    {
      message:
        "CNIC number must be in the format 12345-1234567-1 and contain exactly 13 digits.",
    }
  ),
  password: z.string().refine(
    (value) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(value);
    },
    {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
    }
  ),
  mobileNumber: z.string().refine(
    (value) => {
      // Mobile number should have exactly 9 digits
      const mobileRegex = /^\d{10}$/;
      return mobileRegex.test(value);
    },
    {
      message: "Mobile number must contain exactly 12 digits.",
    }
  ),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  address: z.string().max(200, {
    message: "Address must not exceed 200 characters.",
  }),
  role: z.enum(["voter", "candidate"]),
});
