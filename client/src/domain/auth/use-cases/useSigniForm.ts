import type { AuthAdapter } from "@/domain/auth/adapters/auth-adapter";
import type { AuthRepository } from "@/domain/auth/repositories/auth-repository";
import { signinSchema } from "@/domain/auth/services/auth-validation";
import { useForm } from "@tanstack/react-form";

export const createUseSigninForm = (
  adapter: AuthAdapter,
  repository: AuthRepository,
) => {
  return () => {
    const { setUser } = repository.useAuth();

    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      onSubmit: async ({ value }) => {
        const validation = signinSchema.safeParse(value);

        if (!validation.success) {
          throw new Error("Validation failed!");
        }

        try {
          const session = await adapter.signin({
            email: validation.data.email,
            password: validation.data.password,
          });

          setUser(session.user);

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Signin failed";

          throw new Error(errorMessage);
        }
      },
    });

    return {
      form,
      isSubmitting: form.state.isSubmitting,
      error:
        form.state.errors.length > 0 ? "Please fix validation errors" : null,
    };
  };
};

export type UseSigninForm = ReturnType<typeof createUseSigninForm>;
