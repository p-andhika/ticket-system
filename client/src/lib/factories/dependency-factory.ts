import {
  createAuthAdapter,
  type AuthAdapter,
} from "@/domain/auth/adapters/auth-adapter";
import {
  createAuthRepository,
  type AuthRepository,
} from "@/domain/auth/repositories/auth-repository";
import { QueryClient } from "@tanstack/react-query";
import { createHttpClient } from "../adapters/fetch-http-client";

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
};

export const createAuthDependencies = (): AuthDependencies => {
  // Create HTTP client.
  const httpClient = createHttpClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application-json" },
  });

  // Create adapter (depends on HTTP client).
  const adapter = createAuthAdapter(httpClient);

  // Create repository (state management with Jotai).
  const repository = createAuthRepository();

  return {
    // service,
    adapter,
    repository,
    // useCases,
  };
};
