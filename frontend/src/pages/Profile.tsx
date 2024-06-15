import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

type UserProfile = {
  id: string;
  name: string;
  cnicNumber: string;
  email: string;
  age: number;
  mobileNumber: string;
  address: string;
  role: string;
  isVoted: boolean;
};

const candidateSchema = z.object({
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

type CandidateFormData = z.infer<typeof candidateSchema>;

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      party: "",
      age: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user-login");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3001/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const onSubmit = async (data: CandidateFormData) => {
    setRegistering(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user-login");
        return;
      }

      const res = await axios.post(
        "http://localhost:3001/candidate/signup",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error registering candidate:", error);
      alert("Failed to register candidate.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <main className="flex flex-col justify-center items-center py-20">
      <div className="w-1/2 bg-white p-8 shadow-md rounded mb-8">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>CNIC Number:</strong> {user.cnicNumber}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Mobile Number:</strong> {user.mobileNumber}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Voted:</strong> {user.isVoted}
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Register Candidate</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register Candidate</DialogTitle>
            <DialogDescription>
              Enter candidate details to register.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Candidate Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="party"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Party</FormLabel>
                    <FormControl>
                      <Input placeholder="Party" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Age" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={registering}>
                  {registering ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
