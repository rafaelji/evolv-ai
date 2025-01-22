import { experimentList } from "../data/fakeData.js";
import { broadcast } from "../index.js";
import { getMetricValues } from "../services/experimentService.js";

const getLiveExperiments = (req, res) => {
  res.json(
    experimentList.map((experiment) => ({
      experimentId: experiment.experimentId,
      liveUpdates: experiment.liveUpdates,
    })),
  );
};

const getMetricsByExperimentId = (req, res) => {
  const { id } = req.params;
  const experiment = experimentList.find((exp) => exp.experimentId === id);

  if (!experiment) {
    return res.status(404).json({ message: "Experiment not found" });
  }

  const metricValues = getMetricValues(experiment);

  res.json(metricValues);
};

const postLogsByExperimentId = (req, res) => {
  const { id } = req.params;
  const experiment = experimentList.find((exp) => exp.experimentId === id);

  if (!experiment) {
    return res.status(404).json({ message: "Experiment not found" });
  }

  const log = req.body;

  experiment.liveUpdates.push({ timestamp: new Date().toISOString(), ...log });

  const variantsUpdatedValues = [];

  // Loop through each key in the log (e.g., "control", "variantB")
  Object.keys(log).forEach((key) => {
    const variant = experiment.variants.find(
      (v) => v.name.toLowerCase() === key.toLowerCase(),
    );

    if (variant) {
      // Sum up each property
      variant.visitors += log[key].visitors || 0;
      variant.conversions += log[key].conversions || 0;
      variant.revenue += log[key].revenue || 0;

      variantsUpdatedValues.push(variant);
    }
  });

  if (variantsUpdatedValues.length) {
    experiment.variants = variantsUpdatedValues;
  }

  experimentList.splice(
    experimentList.findIndex(
      (exp) => exp.experimentId === experiment.experimentId,
    ),
    1,
    experiment,
  );

  console.log(`Log registered for experiment ${id}:`, log);

  // Send updated data to clients connected via WebSocket
  broadcast({ type: "updateExperimentList", list: experimentList });
  broadcast({ type: "updateMetrics", ...getMetricValues(experiment) });

  res.status(201).json({ message: "Log registered successfully" });
};

export { getLiveExperiments, getMetricsByExperimentId, postLogsByExperimentId };
