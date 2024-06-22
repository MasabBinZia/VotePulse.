import { z } from "zod";

export const candidateSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  party: z
    .string()
    .min(2, { message: "Party must be at least 2 characters long." }),
  age: z.string().refine(
    (value) => {
      const numericValue = parseInt(value, 10);
      return !isNaN(numericValue) && numericValue >= 18 && numericValue <= 100;
    },
    {
      message: "Age must be a number between 18 and 100.",
    }
  ),
});

export const userLoginformSchema = z.object({
  cnicNumber: z.string().refine(
    (value) => {
      const cnicRegex = /^\d{12}$/;
      return cnicRegex.test(value);
    },
    {
      message: "CNIC number must contain exactly 12 digits.",
    }
  ),
  password: z.string().min(2, {
    message: "Enter Correct Password",
  }),
});

export const userSignupFormSchema = z.object({
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
  cnicNumber: z.string().refine(
    (value) => {
      const cnicRegex = /^\d{12}$/;
      return cnicRegex.test(value);
    },
    {
      message: "CNIC number must contain exactly 12 digits.",
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
      const mobileRegex = /^\d{10}$/;
      return mobileRegex.test(value);
    },
    {
      message: "Mobile number must contain exactly 10 digits.",
    }
  ),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  address: z.string().max(200, {
    message: "Address must not exceed 200 characters.",
  }),
});


export const ForgetPassFormSchema = z.object({
  currentPassword: z.string().min(2, {
    message: "Enter Correct Password",
  }),
  newPassword: z.string().refine(
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
});


export type CandidateFormData = z.infer<typeof candidateSchema>;



