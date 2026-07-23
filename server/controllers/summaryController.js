const supabase = require("../config/supabase");

const askGemini = require("../utils/askGemini");
const checkSummaryLimit = require("../utils/checkSummaryLimit");

const generateSummary = async (req, res) => {
  try {
    const { documentId } = req.params;

    const usage = await checkSummaryLimit(req.user.id);

    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("id")
      .eq("id", Number(documentId))
      .eq("user_id", req.user.id)
      .single();

    if (documentError || !document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const { data: textData, error: textError } = await supabase
      .from("document_texts")
      .select("extracted_text")
      .eq("document_id", Number(documentId))
      .single();

    if (textError || !textData) {
      return res.status(404).json({
        success: false,
        message: "Document text not found.",
      });
    }

    const summary = await askGemini(
      textData.extracted_text,
      "Generate a professional structured summary of this document.",
    );

    const finalSummary =
      typeof summary === "string"
        ? summary
        : summary.answer || JSON.stringify(summary);

    const { error: updateDocError } = await supabase
      .from("documents")
      .update({
        summary: finalSummary,
      })
      .eq("id", Number(documentId));

    if (updateDocError) throw updateDocError;

    const { error: usageError } = await supabase
      .from("daily_usage")
      .update({
        summary_count: usage.summary_count + 1,
      })
      .eq("id", usage.id);

    if (usageError) throw usageError;

    return res.status(200).json({
      success: true,
      summary: finalSummary,
      remainingSummaries: 5 - (usage.summary_count + 1),
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
  generateSummary,
};
