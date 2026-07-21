import { useEffect, useState } from "react";
import { Bell, FileText, CheckCircle2 } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getDocuments } from "../services/documentService";

function Notifications() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const docs = await getDocuments();

      setDocuments(docs || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Notifications</h1>

          <p className="text-slate-500 mt-2">
            Activity related to your AI Document Intelligence Platform.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            Loading...
          </div>
        ) : documents.length === 0 ? (
          <>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Bell className="text-blue-600" />
              </div>

              <div>
                <h2 className="font-bold">Welcome to DocAI</h2>

                <p className="text-slate-600 mt-2">
                  Upload your first PDF to unlock AI Chat, Semantic Search,
                  Summaries and Document Intelligence.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <FileText className="text-indigo-600" />
              </div>

              <div>
                <h2 className="font-bold">No Documents Uploaded</h2>

                <p className="text-slate-600 mt-2">
                  Once you upload PDFs, important activities will appear here.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
            <CheckCircle2 className="mx-auto text-green-600" size={56} />

            <h2 className="text-2xl font-bold mt-5">You're all caught up</h2>

            <p className="text-slate-500 mt-3">
              There are no new notifications at the moment.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
