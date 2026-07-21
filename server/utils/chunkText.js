const chunkText = (text, chunkSize = 1000, overlap = 200) => {
  if (!text || !text.trim()) return [];

  const cleanText = text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = cleanText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let currentChunk = "";

  for (const paragraph of paragraphs) {
    // Paragraph itself is too large
    if (paragraph.length > chunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      let start = 0;

      while (start < paragraph.length) {
        const end = Math.min(start + chunkSize, paragraph.length);

        chunks.push(paragraph.slice(start, end));

        start += chunkSize - overlap;
      }

      continue;
    }

    if (
      currentChunk.length + paragraph.length + 2 <=
      chunkSize
    ) {
      currentChunk +=
        currentChunk === ""
          ? paragraph
          : "\n\n" + paragraph;
    } else {
      chunks.push(currentChunk);
      currentChunk = paragraph;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  const finalChunks = [];

  for (let i = 0; i < chunks.length; i++) {
    if (i === 0) {
      finalChunks.push(chunks[i]);
      continue;
    }

    const previous = finalChunks[finalChunks.length - 1];

    const overlapText = previous.slice(
      Math.max(0, previous.length - overlap)
    );

    finalChunks.push(overlapText + "\n\n" + chunks[i]);
  }

  return finalChunks;
};

module.exports = chunkText;