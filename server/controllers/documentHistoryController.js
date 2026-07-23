const supabase = require("../config/supabase");

const getAllDocuments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("chat_history")
      .select(
        `
        id,
        question,
        answer,
        created_at,
        document_id,
        documents(
          file_name
        )
      `,
      )
      .eq("user_id", req.user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      history: data || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllDocuments,
};
