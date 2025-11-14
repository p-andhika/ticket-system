import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import { type FormEvent } from "react";
import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const { useCases } = useDependenciesStore((state) => state.authDependencies);
  const { useMagicLink } = useCases;

  const { form, isSubmitting, error } = useMagicLink();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await form.handleSubmit();

      if (!form.state.errors.length) {
        toast.success("Password reset email sent! Check your email");
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
                    ? "Sending password reset email..."
                    : "Send password reset email"}
                </Button>
              </div>
            );
          }}
        />
      </div>
    </form>
  );
};
