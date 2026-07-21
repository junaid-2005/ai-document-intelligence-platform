const supabase = require("../config/supabase");

const searchRelevantChunks = require("../utils/searchRelevantChunks");

const askGemini = require("../utils/askGemini");

const saveChatHistory = require("../utils/saveChatHistory");

const getRecentChatHistory = require("../utils/getRecentChatHistory");

const chatWithDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const { question, replyTo } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("id")
      .eq("id", Number(documentId))
      .eq("user_id", req.user.id)
      .single();

    if (documentError || !document) {
      return res.status(403).json({
        success: false,
        message: "Document not found or access denied.",
      });
    }

    const chunks = await searchRelevantChunks(question, Number(documentId));

    if (!chunks || chunks.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No relevant information found in the document.",
      });
    }

    const context = chunks.map((chunk) => chunk.chunk_text).join("\n\n");

    const conversation = await getRecentChatHistory(
      req.user.id,
      Number(documentId),
    );

    const geminiResponse = await askGemini(
      context,
      question,
      conversation,
      replyTo,
    );

    const answer =
      typeof geminiResponse === "string"
        ? geminiResponse
        : geminiResponse.answer;

    await saveChatHistory(req.user.id, Number(documentId), question, answer);

    return res.status(200).json({
      success: true,
      answer,
      retrievedChunks: chunks.length,
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
  chatWithDocument,
};
