import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import { Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent } from "react";
import { toast } from "sonner";

export const EmailPasswordForm = () => {
  const { useCases } = useDependenciesStore((state) => state.authDependencies);
  const { useSignInForm } = useCases;

  const navigate = useNavigate();

  const { form, isSubmitting, error } = useSignInForm();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit();

      if (!form.state.errors.length) {
        navigate({ to: "/" });
        toast.success("Signin in success!");
      }
    } catch (error) {
      toast.error(String(error));
      console.error(error);
    }
  };

  return (
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <div className="flex items-center">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="********"
                    disabled={isSubmitting}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>

        {error && <div className="text-destructive text-sm">{error}</div>}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
            return (
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                >
                  {isSubmitting ? "Signin in..." : "Login"}
                </Button>
              </div>
            );
          }}
        />
      </div>
    </form>
  );
};
