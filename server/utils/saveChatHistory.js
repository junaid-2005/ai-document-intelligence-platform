const supabase = require("../config/supabase");

const saveChatHistory = async (
  userId,
  documentId,
  question,
  answer,
  replyTo = null,
) => {
  const { data, error } = await supabase
    .from("chat_history")
    .insert({
      user_id: userId,
      document_id: Number(documentId),
      question: question.trim(),
      answer: answer.trim(),
      reply_to: replyTo,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

module.exports = saveChatHistory;
