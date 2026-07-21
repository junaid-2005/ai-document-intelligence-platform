const supabase = require("../config/supabase");

const deleteDocument = async (documentId, userId) => {
  const { data: document, error: documentError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .eq("user_id", userId)
    .single();

  if (documentError || !document) {
    throw new Error("Document not found or unauthorized");
  }

  if (document.file_url) {
    const filePath = document.file_url.split("/documents/")[1];

    if (filePath) {
      await supabase.storage.from("documents").remove([filePath]);
    }
  }

  await supabase.from("chat_history").delete().eq("document_id", documentId);

  await supabase
    .from("document_embeddings")
    .delete()
    .eq("document_id", documentId);

  await supabase.from("document_chunks").delete().eq("document_id", documentId);

  await supabase
    .from("document_extracted_text")
    .delete()
    .eq("document_id", documentId);

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", documentId)
    .eq("user_id", userId);

  if (error) throw error;
};

module.exports = deleteDocument;
