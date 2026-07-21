import supabase from "./supabase";

export const signUp = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/login",
    },
  });
};

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
