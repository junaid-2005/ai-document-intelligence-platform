const supabase = require("../config/supabase");

const searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query required.",
      });
    }

    const { data: chunks, error } = await supabase
      .from("document_chunks")
      .select(
        `
        document_id,
        chunk_text,
        documents!inner(
          id,
          user_id,
          file_name,
          summary
        )
      `,
      )
      .eq("documents.user_id", req.user.id)
      .ilike("chunk_text", `%${query}%`)
      .limit(20);

    if (error) throw error;

    const results = (chunks || []).map((chunk) => ({
      documentId: chunk.document_id,
      fileName: chunk.documents.file_name,
      summary: chunk.documents.summary,
      snippet: chunk.chunk_text.substring(0, 250),
    }));

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  searchDocuments,
};
