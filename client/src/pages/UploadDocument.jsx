// UploadDocument.jsx (PART 1)

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  CloudUpload,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Sparkles,
  HardDrive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import { uploadPdfToBackend } from "../services/documentService";

function UploadDocument() {
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [file, setFile] = useState(null);

  const [dragging, setDragging] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const validateFile = (selected) => {
    if (!selected) return false;

    if (selected.type !== "application/pdf") {
      alert("Only PDF files are supported.");
      return false;
    }

    if (selected.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return false;
    }

    return true;
  };

  const chooseFile = (selected) => {
    if (!validateFile(selected)) return;

    setFile(selected);
    setSuccess(false);
    setMessage("");
    setProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const dropped = e.dataTransfer.files[0];

    chooseFile(dropped);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    try {
      setUploading(true);
      setProgress(5);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 92) return prev;
          return prev + 4;
        });
      }, 180);

      const result = await uploadPdfToBackend(file);

      clearInterval(timer);

      setProgress(100);

      setSuccess(true);

      setMessage(result.message || "Document uploaded successfully.");

      setTimeout(() => {
        navigate(`/chat/${result.documentId}`);
      }, 1200);
    } catch (err) {
      console.error(err);

      alert(err?.response?.data?.message || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Upload Document
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Upload one PDF securely for AI processing, semantic search,
              intelligent summaries and chat.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-3
            font-semibold
            shadow-sm
            transition
            hover:bg-slate-100
            "
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>
        </div>

        <div className="grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <motion.div
              whileHover={{ y: -3 }}
              className="
              rounded-4xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              "
            >
              <div className="mb-8 flex items-center gap-5">
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
                  via-indigo-600
                  to-purple-600
                  text-white
                  "
                >
                  <CloudUpload size={30} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Upload PDF</h2>

                  <p className="text-slate-500">
                    Drag & Drop or browse your computer.
                  </p>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
                className={`
                cursor-pointer
                rounded-3xl
                border-2
                border-dashed
                p-14
                text-center
                transition-all

                ${
                  dragging
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
                }
                `}
              >
                <Upload size={58} className="mx-auto mb-6 text-blue-600" />

                <h3 className="text-2xl font-bold">Drop your PDF here</h3>

                <p className="mt-3 text-slate-500">
                  or click anywhere to browse
                </p>

                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  accept=".pdf"
                  onChange={(e) => chooseFile(e.target.files[0])}
                />
              </motion.div>

              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                    mt-8
                    rounded-3xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-6
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
                        bg-red-100
                        "
                      >
                        <FileText size={30} className="text-red-600" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{file.name}</h3>

                        <p className="mt-2 text-sm text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {uploading && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      Uploading & Processing...
                    </span>

                    <span className="font-bold text-blue-600">{progress}%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      animate={{
                        width: `${progress}%`,
                      }}
                      className="
                      h-full
                      rounded-full
                      bg-linear-to-r
                      from-blue-600
                      via-indigo-600
                      to-purple-600
                      "
                    />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="
                    mt-8
                    flex
                    items-center
                    gap-4
                    rounded-3xl
                    border
                    border-green-200
                    bg-green-50
                    p-5
                    "
                  >
                    <CheckCircle2 size={28} className="text-green-600" />

                    <div>
                      <h3 className="font-bold text-green-700">
                        Upload Successful
                      </h3>

                      <p className="text-sm text-green-600">{message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-linear-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                py-4
                font-semibold
                text-white
                shadow-xl
                transition
                hover:scale-[1.01]
                disabled:cursor-not-allowed
                disabled:opacity-60
                "
              >
                <Upload size={20} />

                {uploading ? "Processing PDF..." : "Upload & Process PDF"}
              </button>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -2 }}
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <Brain size={28} className="text-blue-600" />

                <h2 className="text-xl font-bold">AI Processing</h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-indigo-600" />
                  <span>AI Summary Generation</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-indigo-600" />
                  <span>Secure Cloud Storage</span>
                </div>

                <div className="flex items-center gap-3">
                  <HardDrive size={18} className="text-indigo-600" />
                  <span>Vector Embedding Pipeline</span>
                </div>

                <div className="flex items-center gap-3">
                  <Brain size={18} className="text-indigo-600" />
                  <span>Gemini AI Analysis</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="
  rounded-3xl
  border
  border-slate-200
  bg-white
  p-6
  shadow-sm
  "
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Platform Capabilities
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Current document processing configuration.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Supported Format</span>
                  <span className="font-semibold text-slate-900">PDF</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Maximum File Size</span>
                  <span className="font-semibold text-slate-900">5 MB</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Recommended Pages</span>
                  <span className="font-semibold text-slate-900">Up to 30</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Active Document</span>
                  <span className="font-semibold text-slate-900">1</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Daily AI Conversations</span>
                  <span className="font-semibold text-slate-900">15</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Daily AI Summaries</span>
                  <span className="font-semibold text-slate-900">5</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Semantic Search</span>
                  <span className="font-semibold text-green-600">Enabled</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">Vector Embeddings</span>
                  <span className="font-semibold text-green-600">Enabled</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-600">AI Chat</span>
                  <span className="font-semibold text-green-600">Enabled</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UploadDocument;
