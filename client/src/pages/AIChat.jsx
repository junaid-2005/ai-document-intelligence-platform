import { generateSummary } from "../services/summaryService";
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDocuments } from "../services/documentService";
import {
  Send,
  Bot,
  User,
  Copy,
  Reply,
  X,
  Loader2,
  Sparkles,
  Check,
  FileText,
  ArrowDown,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { askDocument } from "../services/chatService";
import { getHistory } from "../services/historyService";

function AIChat() {
  const { documentId } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to DocAI.\n\nI'm ready to answer questions about your uploaded document.",
    },
  ]);

  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, [documentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const history = await getHistory();

      const documentHistory = history.filter(
        (item) => String(item.document_id) === String(documentId),
      );

      const docsResult = await getDocuments();
      const docs = Array.isArray(docsResult)
        ? docsResult
        : docsResult.documents || [];

      const currentDocument = docs.find(
        (doc) => String(doc.id) === String(documentId),
      );

      const formatted = [];

      if (currentDocument?.summary && currentDocument.summary.trim() !== "") {
        formatted.push({
          role: "assistant",
          content: currentDocument.summary,
          isSummary: true,
        });
      }

      documentHistory.reverse().forEach((item) => {
        formatted.push({
          role: "user",
          content: item.question,
          replyTo: item.reply_to || null,
        });

        formatted.push({
          role: "assistant",
          content: item.answer,
        });
      });

      if (formatted.length === 0) {
        formatted.push({
          role: "assistant",
          content:
            "👋 Welcome to DocAI.\n\nI'm ready to answer questions about your uploaded document.",
        });
      }

      setMessages(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const copyMessage = async (text, index) => {
    await navigator.clipboard.writeText(text);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };
  const handleGenerateSummary = async () => {
    try {
      setSummaryLoading(true);

      const data = await generateSummary(documentId);
      await loadHistory();

      setMessages((prev) => {
        const withoutOldSummary = prev.filter((m) => !m.isSummary);

        return [
          {
            role: "assistant",
            content: data.summary,
            isSummary: true,
          },
          ...withoutOldSummary,
        ];
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err.message ||
          "Unable to generate summary.",
      );
    } finally {
      setSummaryLoading(false);
    }
  };
  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    const currentQuestion = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
        replyTo,
      },
    ]);

    setMessage("");

    setSending(true);

    try {
      const response = await askDocument(documentId, currentQuestion, replyTo);

      const aiAnswer =
        typeof response.answer === "string"
          ? response.answer
          : response.answer?.answer;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiAnswer,
          chunks: response.retrievedChunks,
        },
      ]);

      setReplyTo(null);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-[30px] border border-slate-200 bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900 p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-lg">
                <Sparkles size={30} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">AI Document Assistant</h1>

                <p className="mt-2 text-blue-100">
                  Ask questions, summarize content and explore your PDF
                  intelligently.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateSummary}
                disabled={summaryLoading}
                className="
    rounded-xl
    bg-white/15
    px-5
    py-3
    text-sm
    font-semibold
    backdrop-blur
    hover:bg-white/20
    disabled:opacity-50
    "
              >
                {summaryLoading ? "Generating..." : "Generate Summary"}
              </button>

              <div className="hidden lg:flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
                <FileText size={22} />

                <div>
                  <p className="text-xs uppercase tracking-widest text-blue-100">
                    Active Document
                  </p>

                  <p className="font-semibold">#{documentId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,.08)]">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-8 py-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white">
                  <Bot size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Conversation</h2>

                  <p className="text-sm text-slate-500">
                    AI responses based on your uploaded PDF
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
              >
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="h-[68vh] space-y-8 overflow-y-auto bg-linear-to-b from-slate-50 via-white to-white px-8 py-8"
          >
            {" "}
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow">
                  <Loader2 size={20} className="animate-spin text-blue-600" />

                  <span className="font-medium text-slate-600">
                    Loading conversation...
                  </span>
                </div>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
                      <Bot size={42} />
                    </div>

                    <h2 className="mt-8 text-3xl font-bold text-slate-900">
                      Start your conversation
                    </h2>

                    <p className="mt-3 max-w-lg text-slate-500 leading-7">
                      Ask questions, generate summaries, explain concepts or
                      retrieve important information from your uploaded
                      document.
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-4 ${
                      msg.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                        <Bot size={19} />
                      </div>
                    )}
                    <div className="max-w-[78%]">
                      {msg.role === "user" && msg.replyTo && (
                        <div className="mb-2 rounded-xl border-l-4 border-blue-500 bg-blue-50 px-4 py-2">
                          <p className="text-xs font-semibold text-blue-700">
                            Replying to
                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                            {msg.replyTo}
                          </p>
                        </div>
                      )}

                      <div
                        className={`rounded-[26px] px-6 py-5 leading-8 transition-all duration-300 ${
                          msg.role === "assistant"
                            ? "border border-slate-200 bg-white text-slate-700 shadow-lg"
                            : "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                        }`}
                      >
                        <p className="whitespace-pre-wrap wrap-break-word">
                          {msg.content}
                        </p>

                        {msg.chunks && (
                          <div className="mt-5 inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                            {msg.chunks} Relevant Chunks
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-5 px-3">
                        <button
                          onClick={() => copyMessage(msg.content, index)}
                          className="flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-blue-600"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check size={14} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>

                        {msg.role === "assistant" && (
                          <button
                            onClick={() => setReplyTo(msg.content)}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Reply size={14} />
                            Reply to this answer
                          </button>
                        )}
                      </div>
                    </div>

                    {msg.role === "user" && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                        <User size={19} />
                      </div>
                    )}
                  </div>
                ))}

                {sending && (
                  <div className="flex items-end gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
                      <Bot size={18} />
                    </div>

                    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-lg">
                      <Loader2
                        size={18}
                        className="animate-spin text-blue-600"
                      />

                      <span className="font-medium text-slate-600">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>{" "}
          <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 p-6 backdrop-blur-xl">
            {replyTo && (
              <div className="mb-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-700">
                      Replying to AI Response
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {replyTo}
                    </p>
                  </div>

                  <button
                    onClick={() => setReplyTo(null)}
                    className="rounded-xl p-2 transition hover:bg-blue-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-end gap-4">
              <textarea
                rows={1}
                value={message}
                placeholder="Ask anything about your document..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="
                min-h-15
                max-h-44
                flex-1
                resize-none
                rounded-3xl
                border
                border-slate-300
                bg-slate-50
                px-6
                py-4
                text-[15px]
                leading-7
                outline-none
                transition-all
                duration-300
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-100
                "
              />

              <button
                disabled={!message.trim() || sending}
                onClick={sendMessage}
                className="
                flex
                h-15
                w-15
                items-center
                justify-center
                rounded-3xl
                bg-linear-to-r
                from-blue-600
                to-indigo-600
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-2xl
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
              >
                {sending ? (
                  <Loader2 size={21} className="animate-spin" />
                ) : (
                  <Send size={22} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIChat;
