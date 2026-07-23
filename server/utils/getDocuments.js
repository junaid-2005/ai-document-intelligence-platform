const supabase = require("../config/supabase");

const getDocuments = async (userId) => {
  const { data, error } = await supabase
    .from("documents")
    .select(
      `
      id,
      file_name,
      file_url,
      file_size,
      summary,
      created_at
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
};

module.exports = getDocuments;
