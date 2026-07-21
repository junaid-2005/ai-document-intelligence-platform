import { FileText } from "lucide-react";

function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-12
      text-center
      "
    >
      <div
        className="
        h-16
        w-16
        mx-auto
        rounded-2xl
        bg-slate-100
        flex
        items-center
        justify-center
        "
      >
        <FileText
          size={28}
          className="text-slate-500"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6">
        {title}
      </h2>

      <p className="text-slate-500 mt-3">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;