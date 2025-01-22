import PerformanceChart from "./PerformanceChart";

const Visualizations = () => {
  return (
    <div className="w-full space-y-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Performance Visualizations
      </h2>
      <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100 p-4">
        <PerformanceChart />
      </div>
      {/* Line Chart */}
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
        <span className="text-gray-400">Line Chart Placeholder</span>
      </div>
    </div>
  );
};

export default Visualizations;
