const supabase =
  require("../config/supabase");

const getChatHistory = async (
  userId
) => {
  const { data, error } =
    await supabase
      .from("chat_history")
      .select(`
        *,
        documents (
          file_name
        )
      `)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data;
};

module.exports =
  getChatHistory;