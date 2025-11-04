import supabase from "../supabase-client";

export type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export const queryTodos = async (): Promise<Array<Todo>> => {
  console.info("Query todos");

  try {
    const { data: todos, error } = await supabase.from("TodoList").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error while getting list of todos!");
    }

    if (!todos || todos.length === 0) {
      return [];
    }

    return todos;
  } catch (error) {
    console.error("Error query todo list", error);
    throw new Error("Failed to get todo list");
  }
};
