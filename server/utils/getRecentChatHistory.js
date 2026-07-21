const supabase = require("../config/supabase");

const getRecentChatHistory = async (userId, documentId) => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("question, answer")
    .eq("user_id", userId)
    .eq("document_id", documentId)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
};

module.exports = getRecentChatHistory;
