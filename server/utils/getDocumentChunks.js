const supabase = require("../config/supabase");

const getDocumentChunks = async (documentId, userId) => {
  const { data: document, error: docError } = await supabase
    .from("documents")
    .select("id")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();

  if (docError || !document) {
    throw new Error("Document not found or unauthorized");
  }

  const { data, error } = await supabase
    .from("document_chunks")
    .select(
      `
        id,
        chunk_text,
        chunk_order
      `,
    )
    .eq("document_id", documentId)
    .order("chunk_order", {
      ascending: true,
    });

  if (error) throw error;

  return data;
};

module.exports = getDocumentChunks;
