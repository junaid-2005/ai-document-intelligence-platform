const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askGemini = async (
  context,
  question,
  conversation = [],
  replyTo = null,
) => {
  const history = conversation
    .slice()
    .reverse()
    .map(
      (item) => `
User:
${item.question}

Assistant:
${item.answer}
`,
    )
    .join("\n");

  const prompt = `
You are an AI Document Intelligence Assistant.

You MUST answer ONLY using the supplied document context.

---------------- DOCUMENT ----------------
${context}

---------------- CHAT HISTORY ----------------
${history}

${
  replyTo
    ? `
User is replying to this message:

${replyTo}
`
    : ""
}

---------------- QUESTION ----------------
${question}

Rules:

1. Use ONLY the document.
2. Never invent information.
3. If information is unavailable, reply:
"I could not find this information in the uploaded document."
4. Keep answers concise.
5. Use bullet points whenever appropriate.
6. For resume review:
   - ATS Score
   - Strengths
   - Weaknesses
   - Missing Keywords
   - Suggestions
7. For summaries:
   - Maximum 150 words.
8. For comparisons:
   - Use tables if appropriate.
9. For lists:
   - Maximum 10 points.
10. Quote important values exactly.

Answer:
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text.trim();
};

module.exports = askGemini;
