import { useEffect, useState } from "react";
import {
  UserCircle2,
  Mail,
  Calendar,
  Shield,
  HardDrive,
  FileText,
  MessageSquare,
  Sparkles,
  Activity,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../services/dashboardService";

function Profile() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    documents: 0,
    chats: 0,
    summaries: 0,
    uploadsThisWeek: 0,
    storageBytes: 0,
    storageMB: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Chats",
      value: stats.chats,
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Summaries",
      value: stats.summaries,
      icon: Sparkles,
      color: "text-purple-600",
    },
    {
      title: "Storage",
      value: `${stats.storageMB} MB`,
      icon: HardDrive,
      color: "text-orange-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[34px] bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/15">
              <UserCircle2 size={80} />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-black">
                {user?.email?.split("@")[0]}
              </h1>

              <div className="mt-5 space-y-3">
                <p className="flex items-center gap-3">
                  <Mail size={18} />
                  {user?.email}
                </p>

                <p className="flex items-center gap-3">
                  <Calendar size={18} />
                  Joined{" "}
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </p>

                <p className="flex items-center gap-3">
                  <Shield size={18} />
                  {user?.email_confirmed_at
                    ? "Verified Account"
                    : "Email Not Verified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
              >
                <Icon size={34} className={`${card.color} mb-4`} />

                <p className="text-slate-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-black">{card.value}</h2>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">Account Information</h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Email</span>

                <span className="font-semibold">{user?.email}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">User ID</span>

                <span className="max-w-xs truncate text-sm font-semibold">
                  {user?.id}
                </span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Email Verified</span>

                <span className="font-semibold">
                  {user?.email_confirmed_at ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Account Status</span>

                <span className="font-semibold text-green-600">Active</span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
              <Activity />
              Activity
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Uploads This Week</span>

                <span className="font-bold">{stats.uploadsThisWeek}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">Documents</span>

                <span className="font-bold">{stats.documents}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">AI Chats</span>

                <span className="font-bold">{stats.chats}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-slate-500">AI Summaries</span>

                <span className="font-bold">{stats.summaries}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Storage Used</span>

                <span className="font-bold">{stats.storageMB} MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
