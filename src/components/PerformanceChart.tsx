import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Experiment,
  ExperimentContext,
  LiveUpdate,
} from "../providers/ExperimentProvider.tsx";
import { getLastUpdatedData } from "../services/last-updated";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Performance",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

interface ChartDataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    stack: string;
  }[];
}

const PerformanceChart = () => {
  const { experiments } = useContext(ExperimentContext);
  const [data, setData] = useState<ChartDataProps>({
    labels: [],
    datasets: [],
  });

  const formatData = (experiment: Experiment) => {
    return {
      labels: experiment?.liveUpdates
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        )
        .map((update: LiveUpdate) =>
          new Date(update.timestamp).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            // @ts-expect-error typescript is not recognizing this property but it does exists
            fractionalSecondDigits: 3,
          }),
        ),
      datasets: [
        {
          label: `Control - Visitors`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.visitors,
          ),
          backgroundColor: "rgb(255, 99, 132)",
          stack: "Stack 0",
        },
        {
          label: `Control - Conversions`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.conversions,
          ),
          backgroundColor: "rgb(75, 192, 192)",
          stack: "Stack 0",
        },
        {
          label: `Control - Revenue`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.revenue,
          ),
          backgroundColor: "rgb(53, 162, 235)",
          stack: "Stack 0",
        },
        {
          label: `Variant B - Visitors`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.visitors,
          ),
          backgroundColor: "rgb(123, 104, 238)",
          stack: "Stack 1",
        },
        {
          label: `Variant B - Conversions`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.conversions,
          ),
          backgroundColor: "rgb(255, 69, 0)",
          stack: "Stack 1",
        },
        {
          label: `Variant B - Revenue`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.revenue,
          ),
          backgroundColor: "rgb(255, 165, 0)",
          stack: "Stack 1",
        },
      ],
    };
  };

  const getLastChartData = useCallback(async () => {
    try {
      const response = await getLastUpdatedData();
      setData(formatData(response[0]));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setData(formatData(experiments[0]));
  }, [experiments]);

  useEffect(() => {
    getLastChartData();
  }, [getLastChartData]);

  return <Bar options={options} data={data} />;
};

export default PerformanceChart;
