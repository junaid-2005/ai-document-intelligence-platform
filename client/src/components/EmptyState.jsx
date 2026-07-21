import {
  FileText,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function EmptyState({
  title,
  description,
}) {
  const navigate =
    useNavigate();

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-16
      text-center
      shadow-sm
      "
    >
      <div
        className="
        w-20
        h-20
        rounded-3xl
        bg-slate-100
        mx-auto
        flex
        items-center
        justify-center
        "
      >
        <FileText
          size={40}
          className="text-slate-500"
        />
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-slate-500 mt-3">
        {description}
      </p>

      <button
        onClick={() =>
          navigate("/upload")
        }
        className="
        mt-6
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-blue-700
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
        "
      >
        Upload Document
      </button>
    </div>
  );
}

export default EmptyState;