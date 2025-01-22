const experimentList = [
  {
    experimentId: "exp_live_001",
    variants: [
      {
        name: "Control",
        visitors: 1200,
        conversions: 250,
        revenue: 4800,
      },
      {
        name: "Variant B",
        visitors: 1100,
        conversions: 290,
        revenue: 5200,
      },
    ],
    liveUpdates: [
      {
        timestamp: "2024-12-27T14:00:00Z",
        control: {
          visitors: 20,
          conversions: 5,
          revenue: 100,
        },
        variantB: {
          visitors: 22,
          conversions: 6,
          revenue: 120,
        },
      },
    ],
  },
];

export { experimentList };
