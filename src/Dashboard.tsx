import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import Visualizations from "./components/Visualizations";
import EventLogPanel from "./components/EventLogPanel";

const Dashboard = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center space-y-6 px-4 py-6">
      <Header />
      <MetricsPanel />
      <Visualizations />
      <EventLogPanel />
    </div>
  );
};

export default Dashboard;
