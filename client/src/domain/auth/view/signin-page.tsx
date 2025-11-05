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
import type { UseSigninForm } from "@/domain/auth/use-cases/useSigninForm";
import { Link } from "@tanstack/react-router";
import {
  GalleryVerticalEnd,
  LockKeyholeIcon,
  WandSparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";

type Props = {
  useSigninForm: UseSigninForm;
  onSigninSuccess: () => void;
};

export const SigninPage = ({ useSigninForm, onSigninSuccess }: Props) => {
  const { form, isSubmitting, error } = useSigninForm();

  const [useMagicLink, setUseMagicLink] = useState(false);

  const handleMagicLink = () => {
    setUseMagicLink(!useMagicLink);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit();

      if (onSigninSuccess && !form.state.errors.length) {
        onSigninSuccess();
      }
    } catch (error) {
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

                {!useMagicLink && (
                  <div className="grid gap-3">
                    <form.Field
                      name="password"
                      children={(field) => {
                        const isInvalid = field.state.meta.errors.length > 0;

                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex items-center">
                              <FieldLabel htmlFor={field.name}>
                                Password
                              </FieldLabel>
                              <Link
                                to="/forgot-password"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </Link>
                            </div>

                            <Input
                              aria-invalid={isInvalid}
                              id={field.name}
                              name={field.name}
                              type={field.name}
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="********"
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
                )}

                {error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Login in..." : "Login"}
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
};
