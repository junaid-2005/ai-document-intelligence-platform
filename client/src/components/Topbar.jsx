import { Bell, Search, UserCircle2, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Documents",
      path: "/documents",
    },
    {
      name: "Upload",
      path: "/upload",
    },
    {
      name: "Workspace",
      path: "/workspace",
    },
  ];

  return (
    <header
      className="
      sticky
      top-0
      z-30
      border-b
      border-slate-200
      bg-white/80
      backdrop-blur-xl
      "
    >
      <div
        className="
        flex
        h-20
        items-center
        justify-between
        gap-6
        px-4
        sm:px-6
        lg:px-8
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            hover:bg-slate-100
            transition
            lg:hidden
            "
          >
            <Menu size={20} />
          </button>

          <nav
            className="
            hidden
            lg:flex
            items-center
            gap-2
            "
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          <div
            className="
  relative
  hidden
  xl:block
  "
          >
            <Search
              size={18}
              className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    text-slate-400
    "
            />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  navigate(`/search?q=${encodeURIComponent(search)}`);
                }
              }}
              className="
              w-80
              rounded-2xl
              border
             border-slate-200
             bg-white
             py-3
             pl-11
             pr-4
            text-sm
            outline-none
            transition-all
          hover:border-blue-500
         focus:border-blue-500
         focus:ring-2
         focus:ring-blue-100
    "
            />
          </div>

          {/* Notifications */}

          <button
            onClick={() => navigate("/notifications")}
            className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            transition-all
            hover:bg-slate-100
            hover:shadow-md
            "
          >
            <Bell size={19} />

            <span
              className="
              absolute
              right-3
              top-3
              h-2.5
              w-2.5
              rounded-full
              bg-blue-600
              ring-2
              ring-white
              "
            />
          </button>

          {/* Profile */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => navigate("/profile")}
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            shadow-sm
            transition-all
            hover:shadow-md
            "
          >
            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-linear-to-br
              from-blue-600
              via-indigo-600
              to-purple-600
              text-white
              "
            >
              <UserCircle2 size={22} />
            </div>

            <div
              className="
              hidden
              md:flex
              flex-col
              "
            >
              <p
                className="
                max-w-40
                truncate
                text-sm
                font-semibold
                text-slate-900
                "
              >
                {user?.email?.split("@")[0] || "User"}
              </p>

              <p
                className="
                max-w-40
                truncate
                text-xs
                text-slate-500
                "
              >
                {user?.email}
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
