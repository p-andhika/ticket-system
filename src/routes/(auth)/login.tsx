import supabase from "@/lib/supabase/supabase-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/login" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data: sessionData, error } = await supabase.auth.signInWithPassword(
      {
        email: data.email as string,
        password: data.password as string,
      },
    );

    console.log(error);

    if (sessionData.session?.user.id) {
      navigate({ to: "/" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="name@example.com"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        required
      />

      <button className="mt-2" type="submit">
        Login
      </button>
    </form>
  );
}
