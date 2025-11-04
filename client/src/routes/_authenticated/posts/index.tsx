import { Button } from "@/components/ui/button";
import { postsQueryOption } from "@/lib/redaxios/queryOptions/posts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts, refetch } = useQuery(postsQueryOption);

  return (
    <div>
      <h1>Posts</h1>
      <Button onClick={() => refetch()}>Re-fetch</Button>
      <ul className="list-disc">
        {posts?.slice(0, 10)?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
}
