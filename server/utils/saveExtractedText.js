const supabase = require("../config/supabase");

const saveExtractedText = async (documentId, text) => {
  const { data, error } = await supabase
    .from("document_texts")
    .insert({
      document_id: documentId,
      extracted_text: text,
    })
    .select("id")
    .single();

  if (error) throw error;

  return data;
};

module.exports = saveExtractedText;
