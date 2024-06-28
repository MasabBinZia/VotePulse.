import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../../envConstants";

const URL = `${BASE_URL}/candidate/vote/count`;

const userLoginformSchema = z.object({
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

export default function UserLoginPage() {
  const [showPassword, setShowPassword] = useState("password");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userLoginformSchema>>({
    resolver: zodResolver(userLoginformSchema),
    defaultValues: {
      cnicNumber: "",
      password: "",
    },
  });
  type ErrorType = {
    response: {
      status: number;
    };
  };

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof userLoginformSchema>) => {
      const res = await axios.post(`${URL}/user/login`, values);
      const { token } = res.data;
      localStorage.setItem("token", token);
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: "default",
        description: "Login Successfully.",
      });
      form.reset();
      navigate("/");
    },
    onError: (error: ErrorType) => {
      console.error("Error during login:", error);
      toast({
        variant: "destructive",
        description: "Can't Login Try again!",
      });
      if (error.response?.status === 409) {
        toast({
          variant: "destructive",
          description: "User already exists!",
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof userLoginformSchema>) => {
    mutation.mutate(values);
  };

  const ShowPassWordHandler = () => {
    setShowPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  return (
    <main className="flex justify-center items-center py-20">
      <Card className="w-1/2 ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            You can login by entering your CNIC number and your Password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cnicNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNIC Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789012" {...field} />
                    </FormControl>
                    <FormMessage />
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
                        placeholder="*********"
                        {...field}
                        type={showPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p
                className={`${buttonVariants()} gap-2 flex items-center justify-center cursor-pointer`}
                onClick={ShowPassWordHandler}
              >
                {showPassword === "password" ? <Eye /> : <EyeOff />}
                {showPassword === "password"
                  ? "Show Password"
                  : "Hide Password"}
              </p>

              {mutation.isError && (
                <p className="text-red-500">
                  {(mutation.error as any)?.response?.data?.error ||
                    "An unexpected error occurred"}
                </p>
              )}

              <div className="gap-2 flex flex-col justify-center items-center">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <Link
                  className={`${buttonVariants({
                    variant: "outline",
                  })} w-full text-center py-2 rounded-lg`}
                  to={"/user-signup"}
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
