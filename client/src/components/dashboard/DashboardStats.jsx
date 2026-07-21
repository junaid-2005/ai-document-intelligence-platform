import { motion } from "framer-motion";

import { FileText, MessageSquare, Sparkles } from "lucide-react";

function DashboardStats({ documentCount, chatCount, summaryCount }) {
  const cards = [
    {
      title: "Documents",
      value: documentCount,
      icon: FileText,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "AI Chats",
      value: chatCount,
      icon: MessageSquare,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Summaries",
      value: summaryCount,
      icon: Sparkles,
      color: "from-purple-600 to-pink-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
            }}
            className="
              rounded-[30px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-xl
              "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">{card.title}</p>

                <h2 className="mt-3 text-5xl font-black text-slate-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-linear-to-br
                  ${card.color}
                  text-white
                  shadow-xl
                  `}
              >
                <Icon size={34} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default DashboardStats;
