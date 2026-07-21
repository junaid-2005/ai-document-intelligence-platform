const pdfParse = require("pdf-parse");

const extractPdfText = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    const text = (data.text || "").trim();

    return {
      text,
      pages: data.numpages || 0,
      isScanned: text.length < 50,
      info: data.info || {},
      metadata: data.metadata || null,
    };
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to extract text from PDF.");
  }
};

module.exports = extractPdfText;
