import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Trash2,
  Eye,
  MessageSquare,
  Sparkles,
  Calendar,
  HardDrive,
  Upload,
  ShieldCheck,
  RefreshCw,
  BrainCircuit,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSkeleton from "../components/LoadingSkeleton";

import { getDocuments, deleteDocument } from "../services/documentService";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const data = await getDocuments();

      setDocuments(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this PDF?\n\nChats, summaries, chunks and embeddings will also be deleted permanently.",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteDocument(id);

      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error(err);

      alert("Unable to delete document.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.file_name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [documents, search]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          overflow-hidden
          rounded-[34px]
          bg-linear-to-r
          from-blue-700
          via-indigo-700
          to-slate-900
          p-10
          text-white
          shadow-2xl
          "
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-6 inline-flex rounded-3xl bg-white/10 p-5 backdrop-blur">
                <BrainCircuit size={38} />
              </div>

              <h1 className="text-5xl font-black">Document Center</h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Upload, organize, search and chat with your PDFs using
                AI-powered document intelligence.
              </p>
            </div>

            <Link
              to="/upload"
              className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-slate-900
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              "
            >
              <Upload size={20} />
              Upload PDF
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-blue-100 p-4">
                <FileText className="text-blue-600" size={30} />
              </div>

              <span className="text-4xl font-black">{documents.length}</span>
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
              Total PDFs
            </p>
          </motion.div>{" "}
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-indigo-100 p-4">
                <Sparkles className="text-indigo-600" size={30} />
              </div>

              <span className="text-4xl font-black">5</span>
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
              Daily Summaries
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-green-100 p-4">
                <MessageSquare className="text-green-600" size={30} />
              </div>

              <span className="text-4xl font-black">15</span>
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
              Daily Chats
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-purple-100 p-4">
                <HardDrive className="text-purple-600" size={30} />
              </div>

              <span className="text-4xl font-black">5 MB</span>
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-slate-500">
              Storage Limit
            </p>
          </motion.div>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-4
              pl-16
              pr-5
              text-[15px]
              outline-none
              transition-all
              duration-300
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
              "
            />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filteredDocuments.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-lg">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
              <FileText size={42} className="text-slate-500" />
            </div>

            <h2 className="mt-8 text-3xl font-bold text-slate-900">
              No Documents Found
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-slate-500 leading-7">
              Upload your first PDF to unlock AI summaries, semantic search,
              intelligent chat and document insights.
            </p>

            <Link
              to="/upload"
              className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
              "
            >
              <Upload size={20} />
              Upload PDF
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-2">
            {filteredDocuments.map((document) => (
              <motion.div
                key={document.id}
                whileHover={{ y: -6 }}
                className="
                rounded-4xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-lg
                transition-all
                duration-300
                "
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-5">
                    <div className="rounded-3xl bg-blue-100 p-5">
                      <FileText size={34} className="text-blue-600" />
                    </div>

                    <div>
                      <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
                        {document.file_name}
                      </h2>

                      <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />

                          {new Date(document.created_at).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <HardDrive size={16} />
                          {((document.file_size || 0) / 1024 / 1024).toFixed(2)}
                          MB
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                    Ready
                  </div>
                </div>
                {document.summary && (
                  <div className="mt-7 rounded-2xl bg-slate-50 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles size={18} className="text-indigo-600" />

                      <span className="font-semibold text-slate-700">
                        AI Summary
                      </span>
                    </div>

                    <p className="line-clamp-4 leading-7 text-slate-600">
                      {document.summary}
                    </p>
                  </div>
                )}{" "}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={`/ai-chat/${document.id}`}
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-blue-700
                    "
                  >
                    <MessageSquare size={18} />
                    AI Chat
                  </Link>

                  <Link
                    to="/search"
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-3
                    font-semibold
                    text-slate-700
                    transition-all
                    duration-300
                    hover:border-blue-500
                    hover:text-blue-600
                    "
                  >
                    <Search size={18} />
                    Semantic Search
                  </Link>

                  <Link
                    to={document.file_url}
                    target="_blank"
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-3
                    font-semibold
                    text-slate-700
                    transition-all
                    duration-300
                    hover:border-blue-500
                    hover:text-blue-600
                    "
                  >
                    <Eye size={18} />
                    View PDF
                  </Link>

                  <button
                    disabled={deletingId === document.id}
                    onClick={() => handleDelete(document.id)}
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-red-50
                    px-5
                    py-3
                    font-semibold
                    text-red-600
                    transition-all
                    duration-300
                    hover:bg-red-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    "
                  >
                    {deletingId === document.id ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Documents;
