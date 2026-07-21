const supabase =
  require("../config/supabase");

const saveEmbeddings =
  async (
    documentId,
    chunks,
    embeddings
  ) => {

    const rows =
      chunks.map(
        (
          chunk,
          index
        ) => ({
          document_id:
            documentId,
          chunk_text:
            chunk,
          embedding:
            embeddings[
              index
            ],
        })
      );

    const {
      error,
    } =
      await supabase
        .from(
          "document_embeddings"
        )
        .insert(rows);

    if (error)
      throw error;
  };

module.exports =
  saveEmbeddings;