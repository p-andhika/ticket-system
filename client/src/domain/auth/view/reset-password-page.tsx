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
import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import type { FormEvent } from "react";
import { toast } from "sonner";

export const ResetPasswordPage = () => {
  const { useCases } = useDependenciesStore((state) => state.authDependencies);
  const { useResetPassword } = useCases;

  const { form, isSubmitting, error } = useResetPassword();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit();

      if (!form.state.errors.length) {
        toast.success("Reset password success!");
      }
    } catch (error) {
      toast.error(String(error));
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a new password</CardTitle>
        <CardDescription>
          This replaces the password you use to log in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <form.Field
                name="newPassword"
                children={(field) => {
                  const isInvalid = field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        type="password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="New Password"
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
                name="confirmPassword"
                children={(field) => {
                  const isInvalid = field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        type="password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Confirm Password"
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
                      {isSubmitting
                        ? "Resetting password..."
                        : "Save & Continue"}
                    </Button>
                  </div>
                );
              }}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
