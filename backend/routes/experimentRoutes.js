import express from "express";
import {
  getLiveExperiments,
  getMetricsByExperimentId,
  postLogsByExperimentId,
} from "../controllers/experimentController.js";

const router = express.Router();

router.get("/live", getLiveExperiments);
router.get("/:id/metrics", getMetricsByExperimentId);
router.post("/:id/logs", postLogsByExperimentId);

export default router;
