import { motion } from "framer-motion";

import { FileText, Calendar, MessageSquare, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

function RecentDocuments({ documents = [] }) {
  return (
    <div
      className="
      rounded-[34px]
      border
      border-slate-200
      bg-white
      shadow-xl
      overflow-hidden
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-slate-200
        px-8
        py-6
        "
      >
        <div>
          <h2 className="text-2xl font-bold">Recent Documents</h2>

          <p className="mt-2 text-slate-500">Latest uploaded PDFs</p>
        </div>

        <Link
          to="/documents"
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-blue-600
          px-5
          py-3
          text-white
          transition-all
          duration-300
          hover:bg-blue-700
          "
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {documents.length === 0 && (
          <div className="py-20 text-center">
            <FileText size={70} className="mx-auto text-slate-300" />

            <h3 className="mt-6 text-xl font-bold">No Documents</h3>

            <p className="mt-3 text-slate-500">
              Upload your first PDF to start using AI.
            </p>
          </div>
        )}

        {documents.map((doc) => (
          <motion.div
            whileHover={{
              backgroundColor: "#f8fafc",
            }}
            key={doc.id}
            className="
              flex
              flex-col
              gap-6
              px-8
              py-7
              lg:flex-row
              lg:items-center
              lg:justify-between
              "
          >
            <div className="flex gap-5">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-linear-to-br
                  from-blue-600
                  to-indigo-600
                  text-white
                  "
              >
                <FileText size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold">{doc.file_name}</h3>

                <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Calendar size={15} />

                    {new Date(doc.created_at).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-2">
                    <MessageSquare size={15} />
                    AI Ready
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/chat/${doc.id}`}
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-blue-700
                "
            >
              Open Chat
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RecentDocuments;
