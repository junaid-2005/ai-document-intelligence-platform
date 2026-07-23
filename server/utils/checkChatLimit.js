const supabase = require("../config/supabase");

const CHAT_LIMIT = 15;

const checkChatLimit = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  let { data, error } = await supabase
    .from("daily_usage")
    .select("*")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (!data) {
    const { data: created, error: createError } = await supabase
      .from("daily_usage")
      .insert({
        user_id: userId,
        usage_date: today,
        chat_count: 0,
        summary_count: 0,
      })
      .select()
      .single();

    if (createError) throw createError;

    data = created;
  }

  if (data.chat_count >= CHAT_LIMIT) {
    throw new Error("Daily AI chat limit reached.");
  }

  return data;
};

module.exports = checkChatLimit;
