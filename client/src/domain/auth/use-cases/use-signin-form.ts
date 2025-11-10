import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import type { AuthRepository } from "@/domain/auth/repositories/auth-repository";
import { signInSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const createUseSignInForm = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { setUser } = repository.useAuth();
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      validators: {
        onSubmit: signInSchema,
      },
      onSubmit: async ({ value }) => {
        setSubmissionError(null);

        try {
          const session = await adapter.signIn({
            email: value.email,
            password: value.password,
          });

          setUser(session.user);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Signin failed";

          setSubmissionError(errorMessage);
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

export type UseSignInForm = ReturnType<typeof createUseSignInForm>;
