import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#eab308"];

function ReviewCharts({ analysis }) {
  const data = [
    { name: "Positive", value: analysis.positive },
    { name: "Negative", value: analysis.negative },
    { name: "Neutral", value: analysis.neutral },
  ];

  return (
    <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <BarChart width={300} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </div>
  );
}

export default ReviewCharts;
