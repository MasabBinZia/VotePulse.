import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/utils/types/types";

import { BASE_URL } from "../../envConstants";
import { CandidateFormData, candidateSchema } from "@/utils/formsSchema";
import ForgetPasswordDialog from "@/components/forget-pass-dialog";

const URL = `${BASE_URL}/user/profile`;

export default function ProfilePage() {
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ["userdata"],
    queryFn: () =>
      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data.user),
  });

  const user = data;

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      party: "",
      age: "",
    },
  });

  const onSubmit = async (data: CandidateFormData) => {
    setRegistering(true);
    try {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <LoaderCircle className="animate-spin h-20 w-20" />
      </div>
    );
  }

  if (error) {
    return <p>No user data available.</p>;
  }

  return (
    <main className="flex flex-col justify-center items-center py-20">
      <Card className="w-1/2 my-4">
        <CardHeader>
          <CardTitle>Your Info</CardTitle>
          <CardDescription>
            Here is all the necessary info of the user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Name :</Label>
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">CNIC Number :</Label>
            <p>{user?.cnicNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Email :</Label>
            <p>{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Age :</Label>
            <p>{user?.age}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Mobile Number :</Label>
            <p>{user?.mobile}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Address :</Label>
            <p>{user?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Role :</Label>
            <p>{user?.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-bold text-lg">Voted :</Label>
            <p>{user?.isVoted === false ? "No" : "Yes"}</p>
          </div>
        </CardContent>
      </Card>
      {user?.role === "admin" && (
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
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registering}
                  >
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
      )}
      <ForgetPasswordDialog />
    </main>
  );
}
