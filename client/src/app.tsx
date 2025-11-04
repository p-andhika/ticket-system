import {
  authDependenciesAtom,
  queryClientDependenciesAtom,
} from "@/lib/jotai/jotai-dependencies-atom";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance.
const router = createRouter({
  routeTree,
  context: { auth: null, queryClient: undefined! },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale.
  // This will ensure that the loader is always called when the route is preloaded or visited.
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  scrollRestoration: true,
});

// Register things for typesafety.
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const queryClient = useAtomValue(queryClientDependenciesAtom);
  const authDeps = useAtomValue(authDependenciesAtom);

  // Get current user from repository.
  const { user } = authDeps.repository.useAuth();

  // Create minimal session object for router context.
  const session = user ? user : null;

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{ auth: session, queryClient }}
      />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <JotaiProvider>
      <AppContent />
    </JotaiProvider>
  );
}

export default App;
