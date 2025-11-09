import { useDependenciesStore } from "@/lib/zustand/dependencies-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "./components/ui/sonner";
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

function App() {
  const queryClient = useDependenciesStore((state) => state.queryClient);
  const authDeps = useDependenciesStore((state) => state.authDependencies);

  // Get current user from repository.
  const { user } = authDeps.repository.useAuth();

  // Create minimal session object for router context.
  const session = user ? user : null;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          context={{ auth: session, queryClient }}
        />
      </QueryClientProvider>

      <Toaster richColors expand />
    </>
  );
}

export default App;
