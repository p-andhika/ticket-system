import supabase from "@/lib/supabase/supabase-client";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// const getSupabaseAuthTokenKey = (url: string) => {
//   try {
//     const hostname = new URL(url).hostname;
//     const projectId = hostname.split(".")[0];
//     return `sb-${projectId}-auth-token`; // save session detail in local storage
//   } catch (error) {
//     console.error(error);
//     throw new Error("Invalid Supabase URL");
//   }
// };

const useAuth = () => {
  const [session, setSession] = useState<{ user: User | null }>({ user: null });
  // JSON.parse(
  //   localStorage.getItem(
  //     getSupabaseAuthTokenKey(import.meta.env.VITE_SUPABASE_URL),
  //   ) || "{}",
  // ) || null,

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setSession(data);
    };

    init();
  }, []);

  return session.user;
};

export { useAuth };
