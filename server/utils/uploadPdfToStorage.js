const supabase = require("../config/supabase");

const uploadPdfToStorage = async (file) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(fileName, file.buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } = supabase.storage.from("documents").getPublicUrl(fileName);

  return data.publicUrl;
};

module.exports = uploadPdfToStorage;
