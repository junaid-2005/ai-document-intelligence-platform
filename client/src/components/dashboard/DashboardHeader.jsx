import { motion } from "framer-motion";
import { Sparkles, Bell, CalendarDays } from "lucide-react";

function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
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
      overflow-hidden
      rounded-[34px]
      bg-linear-to-r
      from-slate-900
      via-blue-900
      to-indigo-900
      p-10
      text-white
      shadow-2xl
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
            <Sparkles size={38} />
          </div>

          <h1 className="text-5xl font-black">{greeting}</h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
            Welcome back to DocAI. Upload, summarize, search and chat with
            documents using AI.
          </p>
        </div>

        <div className="flex gap-5">
          <div className="rounded-3xl bg-white/10 p-6">
            <CalendarDays size={32} />

            <p className="mt-3 text-sm text-blue-100">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6">
            <Bell size={32} />

            <p className="mt-3 text-sm text-blue-100">AI Ready</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHeader;
