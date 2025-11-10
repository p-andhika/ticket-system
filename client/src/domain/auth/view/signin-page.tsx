import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  GalleryVerticalEnd,
  LockKeyholeIcon,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { EmailPasswordForm } from "./components/email-password-form";
import { MagicLinkForm } from "./components/magic-link-form";

export const SignInPage = () => {
  const [useMagicLink, setUseMagicLink] = useState(false);

  const handleMagicLink = () => {
    setUseMagicLink(!useMagicLink);
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
          Acme Inc
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {useMagicLink ? <MagicLinkForm /> : <EmailPasswordForm />}

            <div className="after:border-border relative py-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
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
              {!useMagicLink ? (
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

            <div className="mt-4 text-center text-sm">
              Don&apos;t have account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Signup
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
