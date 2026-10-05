const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getJobs);

router.get("/:id", getJobById);

router.post("/", createJob);

module.exports = router;