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

    const { data: summaryDocs = [], error: summaryError } = await supabase
      .from("documents")
      .select("summary")
      .eq("user_id", userId)
      .not("summary", "is", null);

    if (summaryError) throw summaryError;

    const summaries = summaryDocs.filter(
      (doc) => doc.summary && doc.summary.trim() !== "",
    ).length;

    const { data: docs = [], error } = await supabase
      .from("documents")
      .select(
        `
        id,
        file_name,
        file_size,
        created_at
      `,
      )
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    const storageBytes = docs.reduce(
      (sum, doc) => sum + (doc.file_size || 0),
      0,
    );

    const storageMB = Number((storageBytes / 1024 / 1024).toFixed(2));

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const uploadsThisWeek = docs.filter(
      (doc) => new Date(doc.created_at) >= weekAgo,
    ).length;

    return res.status(200).json({
      success: true,
      documents,
      chats,
      summaries,
      storageBytes,
      storageMB,
      uploadsThisWeek,
      recentDocuments: docs.slice(0, 5),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
