interface MetricCardProps {
  label: string;
  value: string;
}

const MetricCard = ({ label, value }: MetricCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 shadow-sm">
      <h4 className="text-sm text-gray-600">{label}</h4>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default MetricCard;
