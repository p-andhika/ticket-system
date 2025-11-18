import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import { resetPasswordSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const createUseResetPassword = (adapter: AuthAdapter) => {
  return () => {
    const [submissionError, setSubmissionError] = useState<null | string>(null);

    const form = useForm({
      defaultValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validators: {
        onSubmit: resetPasswordSchema,
      },
      onSubmit: async ({ value }) => {
        setSubmissionError(null);

        try {
          await adapter.resetPassword(value.newPassword);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Reset password failed";

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
