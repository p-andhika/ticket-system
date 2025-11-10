import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import { magicLinkSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const createUseMagicLink = (adapter: AuthAdapter) => {
  return () => {
    const [submissionError, setSubmissionError] = useState<null | string>(null);

    const form = useForm({
      defaultValues: {
        email: "",
      },
      validators: {
        onSubmit: magicLinkSchema,
      },
      onSubmit: async ({ value }) => {
        setSubmissionError(null);

        try {
          await adapter.magicLink(value.email);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Magic link failed";

          setSubmissionError(errorMessage);
          console.error(errorMessage);
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

export type UseMagicLink = ReturnType<typeof createUseMagicLink>;
