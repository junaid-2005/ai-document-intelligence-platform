const supabase = require("../config/supabase");

const createDocument = async (
  userId,
  fileName,
  fileUrl,
  summary = null,
  fileSize = 0,
) => {
  const { data, error } = await supabase
    .from("documents")
    .insert({
      user_id: userId,
      file_name: fileName,
      file_url: fileUrl,
      summary,
      file_size: fileSize,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

module.exports = createDocument;
