const supabase = require("../config/supabase");

const getAdminStats = async () => {
  const { count: users } = await supabase.from("profiles").select("*", {
    count: "exact",
    head: true,
  });

  const { count: documents } = await supabase.from("documents").select("*", {
    count: "exact",
    head: true,
  });

  const { count: chats } = await supabase.from("chat_history").select("*", {
    count: "exact",
    head: true,
  });

  const { count: summaries } = await supabase
    .from("documents")
    .select("*", {
      count: "exact",
      head: true,
    })
    .not("summary", "is", null);

  const { data: profiles = [] } = await supabase.from("profiles").select(`
      id,
      full_name,
      email
    `);

  const { data: docs = [] } = await supabase.from("documents").select(`
      user_id,
      file_size
    `);

  const userStorage = profiles.map((user) => {
    const userDocs = docs.filter((doc) => doc.user_id === user.id);

    const storageBytes = userDocs.reduce(
      (sum, doc) => sum + (doc.file_size || 0),
      0,
    );

    return {
      id: user.id,
      name: user.full_name,
      email: user.email,
      documents: userDocs.length,
      storageBytes,
    };
  });

  return {
    users: users || 0,
    documents: documents || 0,
    chats: chats || 0,
    summaries: summaries || 0,
    userStorage,
  };
};

module.exports = getAdminStats;
