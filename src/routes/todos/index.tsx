import { Button } from "@/components/ui/button";
import { todosQueryOption } from "@/libs/supabase/queryOptions/todos";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: todos, refetch } = useQuery(todosQueryOption);

  return (
    <div>
      <h1>Todos</h1>
      <Button onClick={() => refetch()}>Re-fetch</Button>
      <ul className="list-disc">
        {todos?.map((todo) => {
          return <li key={todo.id}>{todo.name}</li>;
        })}
      </ul>
    </div>
  );
}
