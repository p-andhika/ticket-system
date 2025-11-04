import axios from "redaxios";

export type Post = {
  id: string;
  title: string;
  body: string;
};

export class PostNotFound extends Error {}

export const fetchPosts = async (): Promise<Array<Post>> => {
  console.info("Fetching posts");

  try {
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.get<Array<Post>>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts!");
  }
};
