const supabase = require("../config/supabase");

const saveChunks = async (documentId, chunks) => {
  const rows = chunks.map((chunk, index) => ({
    document_id: documentId,
    chunk_text: chunk,
    chunk_index: index + 1,
  }));

  const { data, error } = await supabase
    .from("document_chunks")
    .insert(rows)
    .select("id");

  if (error) throw error;

  return data;
};

module.exports = saveChunks;
