import Dashboard from "./Dashboard.tsx";
import { ExperimentProvider } from "./providers/ExperimentProvider.tsx";

function App() {
  return (
    <ExperimentProvider>
      <div className="min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </ExperimentProvider>
  );
}

export default App;
