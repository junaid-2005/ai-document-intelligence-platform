import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import supabase from "../services/supabase";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
    const loadUser =
      async () => {
        const {
          data: { session },
        } =
          await supabase.auth.getSession();

        const currentUser =
          session?.user || null;

        setUser(currentUser);

        if (currentUser) {
          const { data } =
            await supabase
              .from("profiles")
              .select("is_admin")
              .eq(
                "id",
                currentUser.id
              )
              .single();

          setIsAdmin(
            data?.is_admin ||
              false
          );
        }

        setLoading(false);
      };

    loadUser();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          session
        ) => {
          const currentUser =
            session?.user ||
            null;

          setUser(currentUser);

          if (currentUser) {
            const { data } =
              await supabase
                .from("profiles")
                .select(
                  "is_admin"
                )
                .eq(
                  "id",
                  currentUser.id
                )
                .single();

            setIsAdmin(
              data?.is_admin ||
                false
            );
          } else {
            setIsAdmin(false);
          }
        }
      );

    return () =>
      listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () =>
    useContext(AuthContext);