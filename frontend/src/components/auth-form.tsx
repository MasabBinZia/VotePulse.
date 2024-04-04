import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";

type AuthForm = {
  formType: "Admin" | "Voter";
};

export default function AuthForm({ formType }: AuthForm) {
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
          <div className="space-y-1">
            <Label htmlFor="Cname">Candidate FullName</Label>
            <Input id="Cname" placeholder="Imran Khan" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="Cage">Candidate Age</Label>
            <Input id="Cage" placeholder="71" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="Cparty">Candidate Party</Label>
            <Input id="Cparty" placeholder="PTI" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Sign Up</Button>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Tabs defaultValue="login" className="w-[400px]">
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
              <div className="space-y-1">
                <Label htmlFor="cnic-number">CNIC Number</Label>
                <Input id="cnic-number" placeholder="056418715" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="********" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
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
              <div className="space-y-1">
                <Label htmlFor="name">FullName</Label>
                <Input id="name" placeholder="Masab Bin Zia" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input id="age" placeholder="22" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" placeholder="05151254874" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="xyz132@gmail.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Xyz,Abc,Street,Pakistan" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cnic-number">Cnic Number</Label>
                <Input id="cnic-number" placeholder="05185155" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="password12121" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="roles">Role</Label>
                <RadioGroup defaultValue="voter" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="voter" id="r1" />
                    <Label htmlFor="r1">Voter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="r2" />
                    <Label htmlFor="r2">Candidate</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
}
