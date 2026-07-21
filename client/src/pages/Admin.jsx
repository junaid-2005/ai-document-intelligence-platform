import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Users,
  FileText,
  MessageSquare,
  Sparkles,
  HardDrive,
  Shield,
  Search,
  RefreshCw,
  Calendar,
  Activity,
} from "lucide-react";

import { getAdminDashboard } from "../services/adminService";

function Admin() {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    users: 0,
    documents: 0,
    chats: 0,
    summaries: 0,
    storageMB: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getAdminDashboard();

      setStats(data.stats);

      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.email || "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const cards = [
    {
      title: "Users",
      value: stats.users,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Chats",
      value: stats.chats,
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Storage",
      value: `${stats.storageMB} MB`,
      icon: HardDrive,
      color: "bg-orange-100 text-orange-600",
    },
  ];
  <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
    <h2 className="text-xl font-bold">Platform Summary</h2>

    <div className="mt-6 grid gap-5 md:grid-cols-4">
      <div>
        <p className="text-slate-500">Users</p>
        <h3 className="text-3xl font-bold">{stats.users}</h3>
      </div>

      <div>
        <p className="text-slate-500">Documents</p>
        <h3 className="text-3xl font-bold">{stats.documents}</h3>
      </div>

      <div>
        <p className="text-slate-500">Chats</p>
        <h3 className="text-3xl font-bold">{stats.chats}</h3>
      </div>

      <div>
        <p className="text-slate-500">Platform Storage</p>
        <h3 className="text-3xl font-bold">{stats.storageMB} MB</h3>
      </div>
    </div>
  </div>;
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[34px] bg-linear-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 text-white shadow-2xl"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
                <Shield size={40} />
              </div>

              <h1 className="text-5xl font-black">Admin Dashboard</h1>

              <p className="mt-4 max-w-2xl text-lg text-blue-100 leading-8">
                Monitor platform usage, users, storage, AI activity and
                analytics.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-slate-900 transition hover:-translate-y-1"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500">{card.title}</p>

                    <h2 className="mt-3 text-4xl font-black text-slate-900">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-3xl ${card.color}`}
                  >
                    <Icon size={30} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-4
              pl-14
              pr-5
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
              "
            />
          </div>
        </div>
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-2xl font-bold">Platform Users</h2>

            <p className="mt-2 text-slate-500">Complete user analytics</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">User</th>

                  <th className="p-4 text-left">Role</th>

                  <th className="p-4 text-left">Documents</th>

                  <th className="p-4 text-left">Chats</th>

                  <th className="p-4 text-left">Summaries</th>

                  <th className="p-4 text-left">Storage</th>

                  <th className="p-4 text-left">Joined</th>

                  <th className="p-4 text-left">Last Active</th>
                </tr>
              </thead>

              <tbody>
                {" "}
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {user.email?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {user.email}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                          user.is_admin
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.is_admin ? "Administrator" : "User"}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />

                        {user.documents || 0}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-green-600" />

                        {user.chats || 0}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-purple-600" />

                        {user.summaries || 0}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <HardDrive size={16} className="text-orange-600" />
                        {((user.storage_bytes || 0) / 1024 / 1024).toFixed(2)}
                        MB
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-slate-500" />

                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Activity size={15} className="text-emerald-600" />

                        {user.last_active
                          ? new Date(user.last_active).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Admin;
