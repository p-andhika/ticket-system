import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase/supabase-client";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import type { FormEvent } from "react";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/signup" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data: sessionData, error } = await supabase.auth.signUp({
      email: data.email as string,
      password: data.password as string,
      options: {
        data: {
          firstName: "John",
          lastName: "Doe",
        },
      },
    });

    console.log({ error, sessionData });

    if (sessionData.user) {
      navigate({ to: "/signin" });
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full" type="submit">
                    Signup
                  </Button>

                  {/* <Button variant="outline" className="w-full"> */}
                  {/*   Login with Google */}
                  {/* </Button> */}
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have account?{" "}
                <Link to="/signin" className="underline underline-offset-4">
                  Signin
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
