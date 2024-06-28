import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
});

export default function AdminAuthPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      cparty: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <main className="flex justify-center items-center py-20">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Admin Signup</CardTitle>
          <CardDescription>
            Sign up as an administrator for the e-voting app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="Imran Khan" {...field} />
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
                name="cparty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Party</FormLabel>
                    <FormControl>
                      <Input id="Cparty" placeholder="PTI" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full my-4">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
