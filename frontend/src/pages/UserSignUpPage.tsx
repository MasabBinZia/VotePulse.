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
import { LoaderCircle } from "lucide-react";
import { userSignupFormSchema } from "@/utils/formsSchema";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../../envConstants";

const URL = `${BASE_URL}/candidate/vote/count`;

export default function UserSignUpPage() {
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

  type ErrorType = {
    response: {
      status: number;
    };
  };

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof userSignupFormSchema>) => {
      const formattedValues = {
        ...values,
        age: parseInt(values.age),
      };

      const res = await axios.post(`${URL}/user/signup`, formattedValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: "default",
        description: "User successfully signed up!",
      });
      form.reset();
    },
    onError: (error: ErrorType) => {
      toast({
        variant: "destructive",
        description: "Can't Signup, try again!",
      });
      if (error.response?.status === 409) {
        toast({
          variant: "destructive",
          description: "User already exists!",
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof userSignupFormSchema>) => {
    mutation.mutate(values);
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
              {mutation.isError && (
                <p className="text-red-500">
                  {(mutation.error as any)?.response?.data?.error ||
                    "An unexpected error occurred"}
                </p>
              )}
              <Button
                type="submit"
                className="w-full my-4"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
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
