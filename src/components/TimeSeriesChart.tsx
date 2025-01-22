import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Time Series Chart",
    },
  },
};

interface ChartDataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

const TimeSeriesChart = () => {
  const { experiments } = useContext(ExperimentContext);
  const [data, setData] = useState<ChartDataProps>({
    labels: [],
    datasets: [],
  });

  const formatData = (experiment: Experiment) => {
    return {
      labels: experiment?.liveUpdates.map((update: LiveUpdate) =>
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
          borderColor: "rgb(255, 99, 132, 0.5)",
        },
        {
          label: `Control - Conversions`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.conversions,
          ),
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgb(75, 192, 192, 0.5)",
        },
        {
          label: `Control - Revenue`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.control?.revenue,
          ),
          backgroundColor: "rgb(53, 162, 235)",
          borderColor: "rgb(53, 162, 235, 0.5)",
        },
        {
          label: `Variant B - Visitors`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.variantB?.visitors,
          ),
          backgroundColor: "rgb(123, 104, 238)",
          borderColor: "rgb(123, 104, 238, 0.5)",
        },
        {
          label: `Variant B - Conversions`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.variantB?.conversions,
          ),
          backgroundColor: "rgb(255, 69, 0)",
          borderColor: "rgb(255, 69, 0, 0.5)",
        },
        {
          label: `Variant B - Revenue`,
          data: experiment?.liveUpdates.map(
            (update: LiveUpdate) => update.variantB?.revenue,
          ),
          backgroundColor: "rgb(255, 165, 0)",
          borderColor: "rgb(255, 165, 0, 0.5)",
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

  return <Line options={options} data={data} />;
};

export default TimeSeriesChart;
