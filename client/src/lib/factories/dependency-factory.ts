import {
  createAuthAdapter,
  type AuthAdapter,
} from "@/domain/auth/adapters/auth-adapter";
import {
  createAuthRepository,
  type AuthRepository,
} from "@/domain/auth/repositories/auth-repository";
import {
  createUseMagicLink,
  type UseMagicLink,
} from "@/domain/auth/use-cases/use-magic-link";
import {
  createUseSignInForm,
  type UseSignInForm,
} from "@/domain/auth/use-cases/use-signin-form";
import {
  createUseSignOut,
  type UseSignOut,
} from "@/domain/auth/use-cases/use-signout";
import {
  createUseSignUpForm,
  type UseSignUpForm,
} from "@/domain/auth/use-cases/use-signup-form";
import { createHttpClient } from "@/lib/adapters/fetch-http-client";
import { QueryClient } from "@tanstack/react-query";

// ============================================================================
// QUERY CLIENT (TAN STACK QUERY) DEPENDENCIES
// ============================================================================
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        // staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
        networkMode: "always",
      },
    },
  });
};

// ============================================================================
// AUTH DEPENDENCIES
// ============================================================================

export type AuthDependencies = {
  adapter: AuthAdapter;
  repository: AuthRepository;
  useCases: {
    useSignUpForm: UseSignUpForm;
    useMagicLink: UseMagicLink;
    useSignInForm: UseSignInForm;
    useSignOut: UseSignOut;
  };
};

export const createAuthDependencies = (): AuthDependencies => {
  // Create HTTP client.
  const httpClient = createHttpClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application-json" },
  });

  // Create adapter (depends on HTTP client).
  const adapter = createAuthAdapter(httpClient);

  // Create repository (state management using Zustand).
  const repository = createAuthRepository();

  // Create use cases (orchestration).
  const useSignUpForm = createUseSignUpForm(adapter);
  const useMagicLink = createUseMagicLink(adapter);
  const useSignInForm = createUseSignInForm(adapter, repository);
  const useSignOut = createUseSignOut(adapter, repository);

  return {
    // service,
    adapter,
    repository,
    useCases: {
      useSignUpForm,
      useMagicLink,
      useSignInForm,
      useSignOut,
    },
  };
};
