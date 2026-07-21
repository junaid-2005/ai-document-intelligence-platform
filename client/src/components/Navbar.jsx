import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, ArrowRight, LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/authService";

function Navbar() {
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();

    window.location.href = "/";
  };

  return (
    <header
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-white/80
      border-b
      border-slate-200
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        h-20
        flex
        items-center
        justify-between
        "
      >
        <Link
          to="/"
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            h-12
            w-12
            rounded-2xl
            bg-linear-to-br
            from-blue-600
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
            "
          >
            <FileText size={20} />
          </div>

          <div>
            <h1 className="font-bold text-lg text-slate-900">DocAI</h1>

            <p className="text-xs text-slate-500">Intelligence Platform</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="
            text-slate-600
            hover:text-blue-600
            transition
            "
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="
                text-slate-600
                hover:text-blue-600
                transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-2xl
                font-medium
                transition-all
                shadow-lg
                hover:scale-105
                "
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="
                text-slate-600
                hover:text-blue-600
                transition
                "
              >
                Dashboard
              </Link>

              <Link
                to="/documents"
                className="
                text-slate-600
                hover:text-blue-600
                transition
                "
              >
                Documents
              </Link>

              <Link
                to="/upload"
                className="
                text-slate-600
                hover:text-blue-600
                transition
                "
              >
                Upload
              </Link>

              <button
                onClick={handleLogout}
                className="
                flex
                items-center
                gap-2
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-3
                rounded-2xl
                transition
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
  md:hidden
  flex
  h-11
  w-11
  items-center
  justify-center
  rounded-xl
  border
  border-slate-200
  bg-white
  text-slate-800
  shadow-sm
  hover:bg-slate-100
  transition
  "
        >
          <Menu size={24} strokeWidth={2.5} className="text-slate-800" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="flex flex-col p-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="py-3">
              Home
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="py-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="py-3"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="py-3"
                >
                  Dashboard
                </Link>

                <Link
                  to="/documents"
                  onClick={() => setMobileOpen(false)}
                  className="py-3"
                >
                  Documents
                </Link>

                <Link
                  to="/upload"
                  onClick={() => setMobileOpen(false)}
                  className="py-3"
                >
                  Upload
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-3 rounded-lg bg-red-500 py-2 text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
