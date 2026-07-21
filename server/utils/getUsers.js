const supabase =
  require("../config/supabase");

const getUsers =
  async () => {
    const { data, error } =
      await supabase
        .from("profiles")
        .select(`
          id,
          email,
          is_admin,
          created_at
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error)
      throw error;

    return data;
};

module.exports =
  getUsers;