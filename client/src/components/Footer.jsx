import { Link } from "react-router-dom";

import {
  FileText,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                h-12
                w-12
                rounded-2xl
                bg-blue-600
                flex
                items-center
                justify-center
                "
              >
                <FileText size={20} />
              </div>

              <div>

                <h2 className="font-bold text-xl">
                  DocAI
                </h2>

                <p className="text-slate-400 text-sm">
                  Intelligence Platform
                </p>

              </div>

            </div>

            <p className="mt-6 text-slate-400 leading-relaxed">
              AI-powered document intelligence
              platform for uploading, managing,
              searching and understanding documents.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Product
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/documents"
                  className="hover:text-white transition"
                >
                  Documents
                </Link>
              </li>

              <li>
                <Link
                  to="/upload"
                  className="hover:text-white transition"
                >
                  Upload
                </Link>
              </li>

              <li>
                <Link
                  to="/ai-chat"
                  className="hover:text-white transition"
                >
                  AI Chat
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Documentation</li>
              <li>API Reference</li>
              <li>Support</li>
              <li>Release Notes</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-slate-400">

                <Mail size={18} />

                <span>
                  contact@docai.com
                </span>

              </div>

              <div className="flex gap-3 pt-2">

                <button
                  className="
                  h-11
                  w-11
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  flex
                  items-center
                  justify-center
                  hover:bg-slate-800
                  transition
                  "
                >
                  <ExternalLink size={18} />
                </button>

                <button
                  className="
                  h-11
                  w-11
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  flex
                  items-center
                  justify-center
                  hover:bg-slate-800
                  transition
                  "
                >
                  <Globe size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

        <div
          className="
          mt-16
          pt-8
          border-t
          border-slate-800
          flex
          flex-col
          md:flex-row
          justify-between
          gap-4
          "
        >

          <p className="text-slate-500 text-sm">
            © 2026 DocAI. All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Built with React, Tailwind CSS & AI
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;