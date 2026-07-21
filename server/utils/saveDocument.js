const supabase = require("../config/supabase");

const saveDocument = async (
  fileName,
  fileUrl = null
) => {
  const { data, error } =
    await supabase
      .from("documents")
      .insert([
        {
          file_name: fileName,
          file_url: fileUrl,
        },
      ])
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
};

module.exports = saveDocument;