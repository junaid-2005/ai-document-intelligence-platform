import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import DocumentsChart from "../components/dashboard/DocumentsChart";

import { getDocuments } from "../services/documentService";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  const [stats, setStats] = useState({
    documents: 0,
    chats: 0,
    summaries: 0,
    storageBytes: 0,
    storageMB: 0,
    uploadsThisWeek: 0,
    recentDocuments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const docs = await getDocuments();

      const dashboard = await getDashboardStats();

      setDocuments(docs || []);

      if (dashboard.success) {
        setStats({
          documents: dashboard.documents || 0,
          chats: dashboard.chats || 0,
          summaries: dashboard.summaries || 0,
          storageBytes: dashboard.storageBytes || 0,
          storageMB: dashboard.storageMB || 0,
          uploadsThisWeek: dashboard.uploadsThisWeek || 0,
          recentDocuments: dashboard.recentDocuments || [],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />

        <DashboardStats
          documentCount={stats.documents}
          chatCount={stats.chats}
          summaryCount={stats.summaries}
        />

        <div className="grid gap-8 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RecentDocuments documents={documents} />
          </div>

          <div className="xl:col-span-2">
            <DocumentsChart documents={documents} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
