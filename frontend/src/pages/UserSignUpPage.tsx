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
import { userSignupFormSchema } from "@/utils/formsSchema";
import { useToast } from "@/components/ui/use-toast";

export default function UserSignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof userSignupFormSchema>>({
    resolver: zodResolver(userSignupFormSchema),
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

  const onSubmit = async (values: z.infer<typeof userSignupFormSchema>) => {
    try {
      setLoading(true);
      setError(null);

      const formattedValues = {
        ...values,
        age: parseInt(values.age),
      };

      const res = await axios.post(`${API_URL}/user/signup`, formattedValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "default",
        description: "User successfully signed up!",
      });
      return res.data;
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: "Can't Login Try again!",
      });
      if (error.response?.status === 409) {
        alert("User already exists!");
        toast({
          variant: "destructive",
          description: "User already exists!",
        });
      }
      setError(error.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
      form.reset()
    }
  };

  return (
    <main className="flex justify-center items-center py-20">
      <Card className="w-1/2">
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
                    <FormLabel>Full Name</FormLabel>
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
                      <Input placeholder="example@gmail.com" {...field} />
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
                      <Input placeholder="123456789012" {...field} />
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
