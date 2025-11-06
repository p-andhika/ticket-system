import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import { signupSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const createUseSignupForm = (adapter: AuthAdapter) => {
  return () => {
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      validators: {
        onSubmit: signupSchema,
      },
      onSubmit: async ({ value }) => {
        setSubmissionError(null);

        try {
          await adapter.signup({
            email: value.email,
            password: value.password,
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Signup failed!";

          throw new Error(errorMessage);
        }
      },
    });

    return {
      form,
      isSubmitting: form.state.isSubmitting,
      error: submissionError,
    };
  };
};

export type UseSignupForm = ReturnType<typeof createUseSignupForm>;
