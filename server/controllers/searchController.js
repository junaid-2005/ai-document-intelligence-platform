const supabase =
  require("../config/supabase");

const searchDocuments =
  async (req, res) => {
    try {
      const { query } =
        req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          message:
            "Search query required",
        });
      }

      const {
        data,
        error,
      } = await supabase
        .from(
          "document_chunks"
        )
        .select(`
          id,
          document_id,
          chunk_text
        `)
        .ilike(
          "chunk_text",
          `%${query}%`
        )
        .limit(20);

      if (error)
        throw error;

      const documentIds =
        [
          ...new Set(
            data.map(
              (item) =>
                item.document_id
            )
          ),
        ];

      const {
        data:
          documents,
      } = await supabase
        .from(
          "documents"
        )
        .select(`
          id,
          file_name,
          summary
        `)
        .in(
          "id",
          documentIds
        );

      const results =
        data.map(
          (chunk) => {
            const document =
              documents.find(
                (doc) =>
                  doc.id ===
                  chunk.document_id
              );

            return {
              documentId:
                chunk.document_id,

              fileName:
                document?.file_name,

              summary:
                document?.summary,

              snippet:
                chunk.chunk_text.substring(
                  0,
                  250
                ),
            };
          }
        );

      return res.status(200).json({
        success: true,
        results,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  searchDocuments,
};