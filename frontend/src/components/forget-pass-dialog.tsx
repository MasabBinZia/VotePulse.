import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ForgetPassFormSchema } from "@/utils/formsSchema";
import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:3001";

const ForgetPasswordDialog = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  const ForgetPassForm = useForm<z.infer<typeof ForgetPassFormSchema>>({
    resolver: zodResolver(ForgetPassFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (forgetpass: z.infer<typeof ForgetPassFormSchema>) => {
      return axios.put(`${API_URL}/user/profile/password`, forgetpass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated.",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error changing your password.",
      });
    },
  });

  const onSubmit = ForgetPassForm.handleSubmit((data) => {
    setLoading(true);
    mutation.mutate(data, {
      onSettled: () => setLoading(false),
    });
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={() => setIsDialogOpen(true)}>
          Forget Password ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forget Password ?</DialogTitle>
          <DialogDescription>
            To change your old password enter details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...ForgetPassForm}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={ForgetPassForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={ForgetPassForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordDialog;
