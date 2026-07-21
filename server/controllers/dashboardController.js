const supabase = require("../config/supabase");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { count: documents = 0 } = await supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    const { count: chats = 0 } = await supabase
      .from("chat_history")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    const { count: summaries = 0 } = await supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .not("summary", "is", null);

    const { data: files = [], error } = await supabase
      .from("documents")
      .select(
        `
        id,
        file_name,
        file_size,
        created_at,
        summary
      `,
      )
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    const storageBytes = files.reduce(
      (sum, file) => sum + (file.file_size || 0),
      0,
    );

    const storageMB = Number((storageBytes / 1024 / 1024).toFixed(2));

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const uploadsThisWeek = files.filter(
      (file) => new Date(file.created_at) >= weekAgo,
    ).length;

    const recentDocuments = files.slice(0, 5);

    return res.json({
      success: true,
      documents,
      chats,
      summaries,
      uploadsThisWeek,
      storageBytes,
      storageMB,
      recentDocuments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
