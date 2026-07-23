const supabase = require("../config/supabase");

const DAILY_SUMMARY_LIMIT = 5;

const checkSummaryLimit = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  let { data, error } = await supabase
    .from("daily_usage")
    .select("*")
    .eq("user_id", userId)
    .eq("usage_date", today)
    .maybeSingle();

  if (error) {
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

    if (createError) {
      throw createError;
    }

    data = created;
  }

  if ((data.summary_count || 0) >= DAILY_SUMMARY_LIMIT) {
    throw new Error(
      "Daily AI summary limit reached. Please try again tomorrow.",
    );
  }

  return data;
};

module.exports = checkSummaryLimit;
