const supabase = require("../config/supabase");

const findRelevantChunks = async (
  documentId,
  question
) => {
  const { data, error } = await supabase
    .from("document_chunks")
    .select("*")
    .eq("document_id", documentId);

  if (error) throw error;

  const keywords = question
    .toLowerCase()
    .split(" ");

  const ranked = data
    .map((chunk) => {
      let score = 0;

      const text =
        chunk.chunk_text.toLowerCase();

      keywords.forEach((word) => {
        if (text.includes(word)) {
          score++;
        }
      });

      return {
        ...chunk,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, 3);
};

module.exports = findRelevantChunks;