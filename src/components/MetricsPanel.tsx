import MetricCard from "./MetricCard.tsx";

const MetricsPanel = () => {
  const fakeMetrics = [
    { label: "Total Visitors", value: "1,200" },
    { label: "Conversion Rate", value: "24.5%" },
    { label: "Avg. Session Duration", value: "2m 14s" },
    { label: "Revenue per Visitor", value: "$4.80" },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-md sm:grid-cols-2 lg:grid-cols-4">
      {fakeMetrics.map((metric) => (
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
