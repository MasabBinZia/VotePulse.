import { Button } from "@/components/ui/button";
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

export default function UserAuthPage() {
  return (
    <main className="flex justify-center items-center py-20">
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
                <Label htmlFor="new">New signup</Label>
                <Input id="new" type="signup" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Current signup</Label>
                <Input id="current" type="signup" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New signup</Label>
                <Input id="new" type="signup" />
              </div>
              
            </CardContent>
            <CardFooter>
              <Button>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
