const supabase = require("../config/supabase");

const saveExtractedText = async (documentId, text) => {
  const { error } = await supabase.from("document_texts").insert({
    document_id: documentId,
    extracted_text: text,
  });

  if (error) throw error;
};

module.exports = saveExtractedText;
