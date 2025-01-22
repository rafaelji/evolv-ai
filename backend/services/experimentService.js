export const getMetricValues = (experiment) => {
  const revenuePerVisitor =
    experiment.variants.reduce((sum, variant) => sum + variant.revenue, 0) /
    experiment.variants.reduce((sum, variant) => sum + variant.visitors, 0);
  const conversionRate =
    (experiment.variants.reduce(
      (sum, variant) => sum + variant.conversions,
      0,
    ) /
      experiment.variants.reduce((sum, variant) => sum + variant.visitors, 0)) *
    100;
  const averageSessionDuration =
    Math.random() * (10 - 3) * 60 * 1000 + 3 * 60 * 1000;
  const totalVisitors = experiment.variants.reduce(
    (sum, variant) => sum + variant.visitors,
    0,
  );

  return {
    revenuePerVisitor,
    conversionRate,
    averageSessionDuration,
    totalVisitors,
  };
};
