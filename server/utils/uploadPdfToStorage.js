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
    throw error;
  }

  return fileName;
};

module.exports = uploadPdfToStorage;
