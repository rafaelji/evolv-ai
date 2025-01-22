import { experimentList } from "../data/fakeData.js";
import { broadcast } from "../index.js";

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

  res.json({
    experimentId: experiment.experimentId,
    metrics: experiment.variants,
  });
};

const postLogsByExperimentId = (req, res) => {
  const { id } = req.params;
  const experiment = experimentList.find((exp) => exp.experimentId === id);

  if (!experiment) {
    return res.status(404).json({ message: "Experiment not found" });
  }

  const log = req.body;

  experiment.liveUpdates.push({ timestamp: new Date().toISOString(), ...log });

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

  res.status(201).json({ message: "Log registered successfully" });
};

export { getLiveExperiments, getMetricsByExperimentId, postLogsByExperimentId };
