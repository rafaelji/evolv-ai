import { createContext, useState, ReactNode, useEffect } from "react";

export interface Variant {
  name: string;
  visitors: number;
  conversions: number;
  revenue: number;
}

export interface LiveUpdate {
  timestamp: string;
  [key: string]:
    | { visitors: number; conversions: number; revenue: number }
    | string;
}

export interface Experiment {
  experimentId: string;
  variants: Variant[];
  liveUpdates: LiveUpdate[];
}

type ExperimentContextType = {
  experiments: Experiment[];
};

export const ExperimentContext = createContext<ExperimentContextType>({
  experiments: [],
});

type ExperimentProviderProps = {
  children: ReactNode;
};

export const ExperimentProvider = ({ children }: ExperimentProviderProps) => {
  const [experiments, setExperiment] = useState<Experiment[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5002");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received via WebSocket:", data);

      if (data.type === "updateExperimentList") {
        setExperiment(data.list);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <ExperimentContext.Provider value={{ experiments }}>
      {children}
    </ExperimentContext.Provider>
  );
};
