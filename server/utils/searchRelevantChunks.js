const supabase = require("../config/supabase");

const generateEmbedding = require("./generateEmbedding");

const searchRelevantChunks = async (question, documentId) => {
  const queryEmbedding = await generateEmbedding(question);

  const { data, error } = await supabase.rpc("match_document_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: 0.15,
    match_count: 8,
    p_document_id: documentId,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  return data
    .filter((chunk) => chunk.chunk_text && chunk.chunk_text.trim().length > 0)
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
};

module.exports = searchRelevantChunks;
