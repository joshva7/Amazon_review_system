import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SentimentRadar = ({ analysis }) => {
  if (!analysis) return null;

  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Strength (%)",
        data: [
          analysis.positive_percent,
          analysis.neutral_percent,
          analysis.negative_percent
        ],

        /* 🎨 COLORS */
        backgroundColor: "rgba(34, 197, 94, 0.25)",   // green (fill)
        borderColor: "rgba(34, 197, 94, 1)",          // green (line)
        pointBackgroundColor: [
          "rgba(34, 197, 94, 1)",   // Positive - Green
          "rgba(234, 179, 8, 1)",   // Neutral - Yellow
          "rgba(239, 68, 68, 1)"    // Negative - Red
        ],
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)"
        ],
        borderWidth: 2,
        pointRadius: 5
      }
    ]
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20
        },
        pointLabels: {
          font: {
            size: 14,
            weight: "bold"
          }
        }
      }
    },
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div className="w-96 mx-auto mt-6">
      <h3 className="text-center font-bold mb-3">
        Review Sentiment Radar Analysis
      </h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SentimentRadar;
