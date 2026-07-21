import {
  FileText,
  Brain,
  Search,
  MessageSquare,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

function HeroPreview() {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      shadow-sm
      p-6
      w-full
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="font-bold text-slate-900">
            Document Intelligence Dashboard
          </h3>

          <p className="text-sm text-slate-500">
            AI Powered Workspace
          </p>
        </div>

        <div
          className="
          px-3
          py-2
          rounded-xl
          bg-green-50
          text-green-600
          text-sm
          font-medium
          "
        >
          Active
        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-slate-500 text-sm">
            Documents
          </p>

          <h3 className="text-2xl font-bold mt-2">
            124
          </h3>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-slate-500 text-sm">
            AI Chats
          </p>

          <h3 className="text-2xl font-bold mt-2">
            856
          </h3>
        </div>

      </div>

      {/* Features */}

      <div className="space-y-3">

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <FileText size={18} />
          <span className="text-sm">
            PDF Knowledge Extraction
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <Brain size={18} />
          <span className="text-sm">
            AI Summaries
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <Search size={18} />
          <span className="text-sm">
            Semantic Search
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <MessageSquare size={18} />
          <span className="text-sm">
            Chat With Documents
          </span>
        </div>

      </div>

      {/* Bottom */}

      <div
        className="
        mt-6
        border-t
        border-slate-200
        pt-6
        flex
        items-center
        justify-between
        "
      >
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">
            Processing Ready
          </span>
        </div>

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-100
          flex
          items-center
          justify-center
          "
        >
          <BarChart3
            size={20}
            className="text-blue-600"
          />
        </div>
      </div>

    </div>
  );
}

export default HeroPreview;