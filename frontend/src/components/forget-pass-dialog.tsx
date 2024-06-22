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

const ForgetPasswordDialog = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const ForgetPassForm = useForm<z.infer<typeof ForgetPassFormSchema>>({
    resolver: zodResolver(ForgetPassFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const API_URL = "http://localhost:3001";

  const onSubmitForgetPass = async (
    values: z.infer<typeof ForgetPassFormSchema>
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/user/profile/password`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        variant: "default",
        description: "Changed Successfully.",
      });
      ForgetPassForm.reset();
      setIsDialogOpen(false); // Close the dialog
    } catch (error: any) {
      console.error("Error during changing password:", error);
      toast({
        variant: "destructive",
        description: "Can't Change Password!",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <form
            className="space-y-4"
            onSubmit={ForgetPassForm.handleSubmit(onSubmitForgetPass)}
          >
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
