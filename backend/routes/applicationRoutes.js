const express = require("express");

const {
  applyForJob,
  getMyApplications,
} = require("../controllers/applicationController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  getMyApplications
);

router.post(
  "/:jobId",
  authMiddleware,
  applyForJob
);

module.exports = router;