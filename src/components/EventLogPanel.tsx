import { useCallback, useContext, useEffect, useState } from "react";
import {
  ExperimentContext,
  LiveUpdate,
} from "../providers/ExperimentProvider.tsx";
import { getLastUpdatedDate } from "../services/last-updated";

const EventLogPanel = () => {
  const { experiments } = useContext(ExperimentContext);
  const [logs, setLogs] = useState<LiveUpdate[]>([]);

  const getLastUpdates = useCallback(async () => {
    try {
      const response = await getLastUpdatedDate();
      setLogs(response[0].liveUpdates);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formatData = (log: LiveUpdate) => {
    return Object.entries(log)
      .filter(
        ([key, value]) => key !== "timestamp" && typeof value === "object",
      )
      .flatMap(([key, value]) =>
        Object.entries(
          value as { visitors: number; conversions: number; revenue: number },
        ).map(([prop, val]) => {
          const formattedValue =
            prop === "conversions"
              ? `${val}%`
              : prop === "revenue"
                ? `$${val}`
                : val;
          return (
            <li
              key={`${log.timestamp}-${key}-${prop}`}
              className="mb-2 text-sm text-gray-600"
            >
              {`${new Date(log.timestamp).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })} - Variant ${key}: ${prop} ${formattedValue}`}
            </li>
          );
        }),
      );
  };

  useEffect(() => {
    setLogs(experiments[0]?.liveUpdates);
  }, [experiments]);

  useEffect(() => {
    getLastUpdates();
  }, [getLastUpdates]);

  return (
    <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">Event Logs</h2>
      <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
        <ul className="max-h-40 w-full overflow-auto rounded bg-gray-100 p-2">
          {logs?.map((log) => formatData(log))}
        </ul>
      </div>
    </div>
  );
};

export default EventLogPanel;
