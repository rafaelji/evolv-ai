import MetricCard from "./MetricCard.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUpdatedMetrics, MetricValues } from "../services/metrics";

interface MetricCardProps {
  id: string;
  label: string;
  value: string;
}

const MetricsPanel = () => {
  const [metricCardValues, setMetricCardValues] = useState<MetricCardProps[]>(
    [],
  );

  const initialMetrics = useMemo(
    () => [
      { id: "totalVisitors", label: "Total Visitors", value: "$" },
      { id: "conversionRate", label: "Conversion Rate", value: "%" },
      {
        id: "averageSessionDuration",
        label: "Avg. Session Duration",
        value: "m s",
      },
      {
        id: "revenuePerVisitor",
        label: "Revenue per Visitor",
        value: "",
      },
    ],
    [],
  );

  const transformData = ({
    updatedValues,
    metric,
  }: {
    updatedValues: MetricValues;
    metric: MetricCardProps;
  }) => {
    const updatedValue = updatedValues[metric.id as keyof typeof updatedValues];
    return updatedValue !== undefined
      ? {
          ...metric,
          value: (() => {
            if (metric.id === "conversionRate") {
              return `${updatedValue.toFixed(2)} %`;
            }
            if (metric.id === "averageSessionDuration") {
              return `${Math.floor(updatedValue / 60000)}m ${Math.floor((updatedValue % 60000) / 1000)}s`;
            }
            if (metric.id === "revenuePerVisitor") {
              return `$${updatedValue.toFixed(2)}`;
            }
            return updatedValue.toString();
          })(),
        }
      : metric;
  };

  const getMetricValuesData = useCallback(async () => {
    try {
      const result = await getUpdatedMetrics("exp_live_001");

      const updatedCardValues = initialMetrics.map((metric) =>
        transformData({ updatedValues: result, metric }),
      );

      setMetricCardValues(updatedCardValues);
    } catch (error) {
      console.log(error);
    }
  }, [initialMetrics]);

  useEffect(() => {
    getMetricValuesData();
  }, [getMetricValuesData]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5002");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received via WebSocket:", data);

      if (data.type === "updateMetrics") {
        const updatedCardValues = initialMetrics.map((metric) =>
          transformData({ updatedValues: data, metric }),
        );

        setMetricCardValues(updatedCardValues);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [initialMetrics]);

  return (
    <div className="grid w-full grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-md sm:grid-cols-2 lg:grid-cols-4">
      {metricCardValues.map((metric) => (
        <MetricCard
          key={`${metric.label}-${metric.value}`}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
};

export default MetricsPanel;
