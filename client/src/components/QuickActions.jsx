import {
  Upload,
  FileText,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      title: "Upload Document",
      subtitle: "Add new PDF files",
      icon: Upload,
      link: "/upload",
    },
    {
      title: "View Documents",
      subtitle: "Manage stored files",
      icon: FileText,
      link: "/documents",
    },
    {
      title: "AI Chat",
      subtitle: "Ask questions instantly",
      icon: MessageSquare,
      link: "/ai-chat",
    },
  ];

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      "
    >
      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="
              group
              flex
              items-center
              justify-between
              p-5
              rounded-2xl
              border
              border-slate-200
              hover:border-blue-200
              hover:bg-blue-50
              transition-all
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className="
                  h-12
                  w-12
                  rounded-2xl
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  "
                >
                  <Icon
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.subtitle}
                  </p>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="
                text-slate-400
                group-hover:text-blue-600
                "
              />

            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;