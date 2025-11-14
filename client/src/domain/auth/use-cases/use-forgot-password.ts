import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import { forgotPasswordSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const createUseForgotPassword = (adapter: AuthAdapter) => {
  return () => {
    const [submissionError, setSubmissionError] = useState<null | string>(null);

    const form = useForm({
      defaultValues: {
        email: "",
      },
      validators: {
        onSubmit: forgotPasswordSchema,
      },
      onSubmit: async ({ value }) => {
        setSubmissionError(null);

        try {
          await adapter.forgotPassword(value.email);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Forgot password link failed";

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

export type UseForgotPassword = ReturnType<typeof createUseForgotPassword>;
