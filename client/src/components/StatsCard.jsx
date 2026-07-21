function StatsCard({
  title,
  value,
  description,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <h2 className="text-4xl font-bold mt-2 text-slate-800">
        {value}
      </h2>

      <p className="text-sm text-slate-400 mt-2">
        {description}
      </p>
    </div>
  );
}

export default StatsCard;