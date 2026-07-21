const supabase =
  require("../config/supabase");

const getDocuments = async (
  userId
) => {
  const { data, error } =
    await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
};

module.exports =
  getDocuments;