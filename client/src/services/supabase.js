import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;

export const getAccessToken =
  async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.access_token;
  };