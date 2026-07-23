const supabase = require("../config/supabase");

const deleteDocument = async (documentId, userId) => {
  const { data: document, error: documentError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", Number(documentId))
    .eq("user_id", userId)
    .single();

  if (documentError || !document) {
    throw new Error("Document not found.");
  }

  if (document.file_url) {
    try {
      const filePath = decodeURIComponent(
        document.file_url.split("/documents/")[1],
      );

      if (filePath) {
        await supabase.storage.from("documents").remove([filePath]);
      }
    } catch (e) {
      console.error("Storage delete:", e.message);
    }
  }

  await supabase
    .from("chat_history")
    .delete()
    .eq("document_id", Number(documentId));

  await supabase
    .from("document_embeddings")
    .delete()
    .eq("document_id", Number(documentId));

  await supabase
    .from("document_chunks")
    .delete()
    .eq("document_id", Number(documentId));

  await supabase
    .from("document_texts")
    .delete()
    .eq("document_id", Number(documentId));

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", Number(documentId))
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
};

module.exports = deleteDocument;
