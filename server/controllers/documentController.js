const supabase = require("../config/supabase");

const validatePdf = require("../utils/validatePdf");
const extractPdfText = require("../utils/extractPdfText");
const saveExtractedText = require("../utils/saveExtractedText");
const saveChunks = require("../utils/saveChunks");
const chunkText = require("../utils/chunkText");
const createDocument = require("../utils/createDocument");
const uploadPdfToStorage = require("../utils/uploadPdfToStorage");
const generateSummary = require("../utils/generateSummary");
const generateEmbedding = require("../utils/generateEmbedding");
const saveEmbeddings = require("../utils/saveEmbeddings");

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "PDF is required.",
      });
    }

    const { count, error: countError } = await supabase
      .from("documents")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("user_id", req.user.id);

    if (countError) {
      throw countError;
    }

    if (count >= 1) {
      return res.status(400).json({
        success: false,
        message:
          "Free plan allows only one active PDF. Delete your existing PDF before uploading another.",
      });
    }

    await validatePdf(file);

    const filePath = await uploadPdfToStorage(file);

    const pdfData = await extractPdfText(file.buffer);

    const summary = await generateSummary(pdfData.text);

    const document = await createDocument(
      req.user.id,
      file.originalname,
      filePath,
      summary,
      file.size,
    );

    const documentId = document.id;

    await saveExtractedText(documentId, pdfData.text);

    const chunks = chunkText(pdfData.text, 1000);

    await saveChunks(documentId, chunks);

    const embeddings = await Promise.all(
      chunks.map((chunk) => generateEmbedding(chunk)),
    );

    await saveEmbeddings(documentId, chunks, embeddings);

    return res.status(200).json({
      success: true,
      message: "Document uploaded successfully.",
      documentId,
      fileName: file.originalname,
      summary,
      pages: pdfData.pages,
      textLength: pdfData.text.length,
      chunkCount: chunks.length,
      embeddingCount: embeddings.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select(
        `
        id,
        file_name,
        file_url,
        file_size,
        summary,
        created_at
      `,
      )
      .eq("user_id", req.user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return res.json({
      success: true,
      documents: data || [],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("id, file_url")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (documentError || !document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    await supabase.from("document_embeddings").delete().eq("document_id", id);

    await supabase.from("document_chunks").delete().eq("document_id", id);

    await supabase.from("document_texts").delete().eq("document_id", id);

    await supabase.from("chat_history").delete().eq("document_id", id);

    await supabase
      .from("documents")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (document.file_url) {
      try {
        const path = decodeURIComponent(
          document.file_url.split("/documents/")[1],
        );

        await supabase.storage.from("documents").remove([path]);
      } catch (storageError) {
        console.error("Storage delete failed:", storageError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
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
  uploadDocument,
  getDocuments,
  deleteDocument,
};
