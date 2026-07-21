import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Search, FileText, MessageSquare } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import LoadingSkeleton from "../components/LoadingSkeleton";

import { getDocuments } from "../services/documentService";

function AIWorkspace() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const filtered = documents.filter((doc) =>
      doc.file_name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredDocuments(filtered);
  }, [search, documents]);

  async function loadDocuments() {
    try {
      setLoading(true);

      const result = await getDocuments();

      const docs = Array.isArray(result) ? result : result.documents || [];

      setDocuments(docs);

      setFilteredDocuments(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            AI Workspace
          </h1>

          <p className="mt-3 text-slate-500">
            Choose a document and continue your AI conversation.
          </p>
        </motion.div>

        <div className="relative mt-8">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            py-4
            pl-13
            pr-5
            outline-none
            transition
            focus:border-blue-600
            "
          />
        </div>

        <div className="mt-8 space-y-5">
          {loading ? (
            <LoadingSkeleton />
          ) : filteredDocuments.length === 0 ? (
            <div
              className="
              rounded-3xl
              border
              border-dashed
              border-slate-300
              bg-white
              py-24
              text-center
              "
            >
              <FileText size={64} className="mx-auto text-slate-300" />

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No Documents Found
              </h2>

              <p className="mt-3 text-slate-500">
                Upload a PDF to start chatting with AI.
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                "
              >
                {" "}
                <div
                  className="
                  flex
                  flex-col
                  gap-6
                  md:flex-row
                  md:items-center
                  md:justify-between
                  "
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-red-50
                      "
                    >
                      <FileText size={30} className="text-red-600" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {doc.file_name}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className="
                          rounded-full
                          bg-slate-100
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-slate-700
                          "
                        >
                          PDF
                        </span>

                        <span
                          className="
                          rounded-full
                          bg-blue-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-blue-700
                          "
                        >
                          AI Ready
                        </span>

                        <span
                          className="
                          rounded-full
                          bg-green-50
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-green-700
                          "
                        >
                          {new Date(doc.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/ai-chat/${doc.id}`)}
                    className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-blue-600
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                    "
                  >
                    <MessageSquare size={20} />
                    Continue Chat
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIWorkspace;
