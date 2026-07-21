const supabase = require("../config/supabase");

const getAdminDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", userId)
      .single();

    if (profileError) {
      throw profileError;
    }

    if (!profile?.is_admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    const { count: userCount = 0 } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: documentCount = 0 } = await supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: chatCount = 0 } = await supabase
      .from("chat_history")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: summaryCount = 0 } = await supabase
      .from("documents")
      .select("*", {
        count: "exact",
        head: true,
      })
      .not("summary", "is", null);

    const { data: users = [], error: usersError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (usersError) {
      throw usersError;
    }

    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const { data: docs = [] } = await supabase
          .from("documents")
          .select("file_size, summary")
          .eq("user_id", user.id);

        const { count: chats = 0 } = await supabase
          .from("chat_history")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        return {
          ...user,
          documents: docs.length,
          summaries: docs.filter((doc) => doc.summary).length,
          chats,
          storage_bytes: docs.reduce(
            (sum, doc) => sum + (doc.file_size || 0),
            0,
          ),
        };
      }),
    );

    const totalStorage = enrichedUsers.reduce(
      (sum, user) => sum + user.storage_bytes,
      0,
    );

    return res.json({
      success: true,
      stats: {
        users: userCount,
        documents: documentCount,
        chats: chatCount,
        summaries: summaryCount,
        storageBytes: totalStorage,
        storageMB: Number((totalStorage / 1024 / 1024).toFixed(2)),
      },
      users: enrichedUsers,
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
  getAdminDashboard,
};
