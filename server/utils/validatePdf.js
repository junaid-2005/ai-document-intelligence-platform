const pdfParse = require("pdf-parse");

const validatePdf = async (file) => {
  if (!file) {
    throw new Error("No file uploaded.");
  }

  if (file.mimetype !== "application/pdf") {
    throw new Error("Only PDF files are allowed.");
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Maximum PDF size is 5 MB.");
  }

  try {
    const pdf = await pdfParse(file.buffer);

    if (pdf.numpages > 50) {
      throw new Error("Maximum 50 pages are allowed.");
    }

    if (!pdf.text || pdf.text.trim().length === 0) {
      throw new Error(
        "This PDF contains no selectable text. Please upload a text-based PDF.",
      );
    }

    return {
      pages: pdf.numpages,
    };
  } catch (error) {
    if (
      error.message.startsWith("Maximum") ||
      error.message.includes("no selectable text")
    ) {
      throw error;
    }

    throw new Error("Invalid or corrupted PDF file.");
  }
};

module.exports = validatePdf;
