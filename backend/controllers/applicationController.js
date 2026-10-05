const Application =
  require("../models/Application");

// Apply for job
const applyForJob = async (
  req,
  res
) => {
  try {
    const jobId = req.params.jobId;

    const existingApplication =
      await Application.findOne({
        user: req.userId,
        job: jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied for this job",
      });
    }

    const application =
      await Application.create({
        user: req.userId,
        job: jobId,
      });

    res.status(201).json({
      message:
        "Application submitted successfully",

      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to submit application",
    });
  }
};

// Get user's applications
const getMyApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          user: req.userId,
        })
          .populate("job")
          .sort({
            createdAt: -1,
          });

      res.json(applications);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to get applications",
      });
    }
  };

module.exports = {
  applyForJob,
  getMyApplications,
};