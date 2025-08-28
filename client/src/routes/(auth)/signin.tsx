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
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  GalleryVerticalEnd,
  LockKeyholeIcon,
  WandSparkles,
} from "lucide-react";
import type { FormEvent } from "react";
import { z } from "zod";

const signinSearchSchema = z.object({
  magicLink: z.boolean().default(false),
});

export const Route = createFileRoute("/(auth)/signin")({
  component: RouteComponent,
  validateSearch: zodValidator(signinSearchSchema),
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/signin" });
  const { magicLink } = Route.useSearch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log({ data });

    // const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    //   credentials: "include",
    // });
    //
    // if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    //
    // const sessionData = await response.json();
    //
    // console.log(sessionData);
    //
    // // const { data: sessionData, error } = await supabase.auth.signInWithPassword(
    // //   {
    // //     email: data.email as string,
    // //     password: data.password as string,
    // //   },
    // // );
    //
    // // console.log(error);
    // //
    // if (sessionData.data.session?.user.id) {
    //   navigate({ to: "/" });
    // }
  };

  const handleMagicLink = () => {
    let finalMagicLink = false;
    if (!magicLink) {
      finalMagicLink = true;
    }

    navigate({
      search: {
        magicLink: finalMagicLink,
      },
    });
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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

                {!magicLink && (
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      required
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>

                  {/* <Button variant="outline" className="w-full"> */}
                  {/*   Login with Google */}
                  {/* </Button> */}
                </div>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleMagicLink}
                >
                  {!magicLink ? (
                    <>
                      <WandSparkles className="size-4" />
                      Magic Link
                    </>
                  ) : (
                    <>
                      <LockKeyholeIcon className="size-4" />
                      Using Password
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                  Signup
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
