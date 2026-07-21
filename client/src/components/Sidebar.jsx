import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  Settings,
  Search,
  History,
  Shield,
  Brain,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";

function Sidebar({ mobile = false, closeSidebar }) {
  const location = useLocation();

  const { user, isAdmin } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Documents",
      icon: FileText,
      path: "/documents",
    },
    {
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      name: "AI Workspace",
      icon: MessageSquare,
      path: "/workspace",
    },
    {
      name: "Search",
      icon: Search,
      path: "/search",
    },
    {
      name: "History",
      icon: History,
      path: "/history",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  if (isAdmin) {
    menuItems.push({
      name: "Admin",
      icon: Shield,
      path: "/admin",
    });
  }

  return (
    <aside
      className={`
      flex
      flex-col
      justify-between
      bg-white
      border-r
      border-slate-200
      ${mobile ? "w-80 h-screen" : "hidden lg:flex w-72 min-h-screen"}
      `}
    >
      <div>
        <div className="px-6 pt-6 pb-5 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              onClick={() => mobile && closeSidebar?.()}
              className="flex items-center gap-4"
            >
              <motion.div
                layoutId="docai-logo"
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-linear-to-br
                from-blue-600
                via-indigo-600
                to-purple-600
                text-white
                shadow-lg
                "
              >
                <Brain size={22} />
              </motion.div>

              <div>
                <h1 className="text-lg font-bold text-slate-900">DocAI</h1>

                <p className="text-xs text-slate-500">Intelligence Platform</p>
              </div>
            </Link>

            {mobile && (
              <button
                onClick={closeSidebar}
                className="
                h-10
                w-10
                rounded-xl
                border
                border-slate-200
                flex
                items-center
                justify-center
                hover:bg-slate-100
                "
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <nav className="px-4 py-5 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => mobile && closeSidebar?.()}
              >
                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-3.5
                  transition-all
                  duration-300
                  overflow-hidden
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                  `}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-blue-600
                      -z-10
                      "
                    />
                  )}

                  <Icon size={20} />

                  <span
                    className="
                    font-medium
                    "
                  >
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-5">
        <div className="mt-6">
          <p
            className="
            truncate
            font-semibold
            text-slate-900
            "
          >
            {user?.email?.split("@")[0]}
          </p>

          <p
            className="
            truncate
            text-sm
            text-slate-500
            "
          >
            {user?.email}
          </p>

          {isAdmin && (
            <div
              className="
              mt-4
              inline-flex
              items-center
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-700
              "
            >
              Admin
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
