import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ReviewCharts({ sentiment }) {
  const data = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [
          sentiment.positive,
          sentiment.negative,
          sentiment.neutral,
        ],
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
      <div style={{ width: "300px" }}>
        <Bar data={data} />
      </div>
      <div style={{ width: "300px" }}>
        <Pie data={data} />
      </div>
    </div>
  );
}
