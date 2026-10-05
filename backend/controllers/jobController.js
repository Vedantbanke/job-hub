const Job = require("../models/Job");

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get jobs",
    });
  }
};

// Get single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get job",
    });
  }
};

// Create job
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      category,
      jobType,
      salary,
      description,
      skills,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !category ||
      !jobType ||
      !description
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      category,
      jobType,
      salary,
      description,
      skills,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create job",
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
};