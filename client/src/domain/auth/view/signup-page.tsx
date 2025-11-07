import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UseSignupForm } from "@/domain/auth/use-cases/use-signup-form";
import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

type Props = {
  useSignupForm: UseSignupForm;
  onSignupSuccess: () => void;
};

export const SignupPage = ({ useSignupForm, onSignupSuccess }: Props) => {
  const { form, isSubmitting, error } = useSignupForm();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit();

      if (onSignupSuccess && !form.state.errors.length) {
        onSignupSuccess();
      }

      toast.success("Signup success!");
    } catch (error) {
      toast.error(String(error));
      console.error(error);
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
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid = field.state.meta.errors.length > 0;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                            type={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            placeholder="name@example.com"
                            disabled={isSubmitting}
                            autoFocus
                          />

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid = field.state.meta.errors.length > 0;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <Input
                            aria-invalid={isInvalid}
                            id={field.name}
                            name={field.name}
                            type={field.name}
                            placeholder="********"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            disabled={isSubmitting}
                          />

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>

                {error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signup in..." : "Signup"}
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
};
