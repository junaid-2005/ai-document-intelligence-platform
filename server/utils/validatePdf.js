const pdfParse = require("pdf-parse");

const validatePdf = async (file) => {
  if (!file) {
    throw new Error("No file uploaded.");
  }

  if (file.mimetype !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  const maxSize = 20 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Maximum PDF size is 20 MB.");
  }

  try {
    const pdf = await pdfParse(file.buffer);

    if (pdf.numpages > 100) {
      throw new Error("Maximum 100 pages are allowed.");
    }

    if (!pdf.text || pdf.text.trim().length === 0) {
      throw new Error(
        "This PDF appears to be scanned. OCR support is not available yet.",
      );
    }

    return {
      pages: pdf.numpages,
    };
  } catch (error) {
    if (error.message.startsWith("Maximum")) {
      throw error;
    }

    throw new Error("Invalid or corrupted PDF file.");
  }
};

module.exports = validatePdf;
