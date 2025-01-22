import { useCallback, useContext, useEffect, useState } from "react";
import {
  ExperimentContext,
  LiveUpdate,
} from "../providers/ExperimentProvider.tsx";
import { getLastUpdatedData } from "../services/last-updated";

const Header = () => {
  const { experiments } = useContext(ExperimentContext);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const sortByNewest = (a: LiveUpdate, b: LiveUpdate) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

  const getLastUpdated = useCallback(async () => {
    try {
      const response = await getLastUpdatedData();
      setLastUpdated(response[0].liveUpdates.sort(sortByNewest)[0].timestamp);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setLastUpdated(
      experiments[0]?.liveUpdates?.sort(sortByNewest)[0].timestamp,
    );
  }, [experiments]);

  useEffect(() => {
    getLastUpdated();
  }, [getLastUpdated]);

  return (
    <header className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <div className="text-2xl font-semibold text-gray-800">Evolv AI</div>
      <div className="text-sm text-gray-600">
        Last updated:{" "}
        <span className="font-medium text-blue-500">
          {new Date(lastUpdated).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      </div>
    </header>
  );
};

export default Header;
