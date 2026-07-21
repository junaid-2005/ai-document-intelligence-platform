const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateSummary = async (text) => {
  const prompt = `
You are an AI Document Intelligence assistant.

Generate a professional summary of the following document.

Rules:
- Maximum 150 words.
- Mention the main purpose of the document.
- Include the most important information only.
- Use clear professional language.
- Do NOT use bullet points.
- Do NOT invent information.
- If the document has very little text, summarize whatever is available.

Document:
${text}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
};

module.exports = generateSummary;
