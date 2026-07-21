import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
              lg:hidden
              "
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              className="
              fixed
              left-0
              top-0
              z-50
              h-screen
              lg:hidden
              "
            >
              <Sidebar mobile closeSidebar={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen">
        <aside
          className="
          hidden
          lg:block
          "
        >
          <Sidebar />
        </aside>

        <div
          className="
          flex
          min-h-screen
          flex-1
          flex-col
          "
        >
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <motion.main
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            "
          >
            <div
              className="
              mx-auto
              w-full
              max-w-425
              "
            >
              {children}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
