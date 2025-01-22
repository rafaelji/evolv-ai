export interface MetricValues {
  revenuePerVisitor: number;
  conversionRate: number;
  averageSessionDuration: number;
  totalVisitors: number;
}

export const getUpdatedMetrics = async (id: string): Promise<MetricValues> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/experiments/${id}/metrics`,
    {
      method: "GET",
    },
  );
  return response.json();
};
