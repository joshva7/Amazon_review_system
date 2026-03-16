import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const SentimentBar = ({ analysis }) => {
  if (!analysis) return null;

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Number of Reviews",
        data: [
          analysis.positive,
          analysis.neutral,
          analysis.negative
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",  // Green
          "rgba(234, 179, 8, 0.8)",  // Yellow
          "rgba(239, 68, 68, 0.8)"   // Red
        ],
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Review Count"
        }
      },
      x: {
        title: {
          display: true,
          text: "Sentiment Type"
        }
      }
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-6">
      <h3 className="text-center font-bold mb-3">
        Review Sentiment Bar Chart
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SentimentBar;
