import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
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

export default function UserSignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      cnicNumber: "",
      password: "",
      mobileNumber: "",
      email: "",
      address: "",
    },
  });

  const API_URL = "http://localhost:3001";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const res = await axios.post(`${API_URL}/user/signup`, values);
      alert("User successfully signed up!"); // Alert on successful signup
      return res.data;
    } catch (error: any) {
      console.log("Error during sign up:", error);
      if (error.response?.status === 409) {
        alert("User already exists!");
      }
      setError(error.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center py-20">
      <Card className="w-1/2 ">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            You can signup into the e-voting app by filling these basic info.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="Masab Bin Zia" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Age</FormLabel>
                    <FormControl>
                      <Input placeholder="79" type="number" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567891" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="axas@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Example Street, City, Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnicNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12345-1234567-1" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full my-4">
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Link
                className={`${buttonVariants({
                  variant: "outline",
                })} w-full text-center py-2 rounded-lg`}
                to={"/user-login"}
              >
                Login
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
