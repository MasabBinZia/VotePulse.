import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/utils/formsSchema";
import { AuthFormTypes } from "@/utils/types/types";

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export default function AuthForm({ formType }: AuthFormTypes) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      cparty: "",
      cnicNumber: "",
      password: "",
      mobileNumber: "",
      email: "",
      address: "",
      role: "voter",
    },
  });
  if (formType == "Admin") {
    return (
      <Card>
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
    );
  } else {
    return (
      <Tabs defaultValue="login" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                You can login by entering your CNIC number and your Password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <Input placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage className="font-bold" />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full my-4">Login</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                You can signup into the e-voting app buy filling these basic
                info.
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
                          <Input placeholder="+92-1234567891" {...field} />
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
                          <Input placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage className="font-bold" />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup defaultValue="voter" {...field}>
                            <RadioGroupItem value="voter" id="voter" />
                            <Label htmlFor="voter">Voter</Label>
                            <RadioGroupItem value="candidate" id="candidate" />
                            <Label htmlFor="candidate">Candidate</Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="font-bold" />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="voter" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Voter
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="candidate" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Candidate
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
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
        </TabsContent>
      </Tabs>
    );
  }
}
