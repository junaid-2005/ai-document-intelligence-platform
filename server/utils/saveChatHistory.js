const supabase = require("../config/supabase");

const saveChatHistory = async (userId, documentId, question, answer) => {
  const { error } = await supabase.from("chat_history").insert({
    user_id: userId,
    document_id: documentId,
    question: question.trim(),
    answer: answer.trim(),
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
};

module.exports = saveChatHistory;
