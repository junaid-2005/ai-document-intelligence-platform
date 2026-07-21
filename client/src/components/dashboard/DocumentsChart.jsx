import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DocumentsChart({ documents = [] }) {
  const chartData = documents.map((doc) => ({
    name:
      doc.file_name.length > 12
        ? doc.file_name.slice(0, 12) + "..."
        : doc.file_name,
    size: Number(((doc.file_size || 0) / 1024 / 1024).toFixed(2)),
  }));

  return (
    <div
      className="
      rounded-[34px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-xl
      "
    >
      <h2 className="text-2xl font-bold">Storage Analytics</h2>

      <p className="mt-2 mb-8 text-slate-500">Document size distribution</p>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />

          <YAxis unit="MB" />

          <Tooltip />

          <Bar dataKey="size" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DocumentsChart;
