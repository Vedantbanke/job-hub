import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

function JobDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response =
        await axios.get(
          `http://localhost:5002/api/jobs/${id}`
        );

      setJob(response.data);
    } catch (error) {
      console.error(error);

      alert("Job not found");

      navigate("/jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async () => {
    if (!token) {
      alert(
        "Please login to apply for this job"
      );

      navigate("/login");

      return;
    }

    try {
      const response =
        await axios.post(
          `http://localhost:5002/api/applications/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to apply"
      );
    }
  };

  if (loading) {
    return (
      <div className="center-page">
        Loading job...
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="job-container">

      <nav className="navbar">
        <h2>Job Hub</h2>

        <div className="nav-links">
          <Link to="/jobs">
            Jobs
          </Link>

          {token && (
            <Link to="/applications">
              My Applications
            </Link>
          )}
        </div>
      </nav>

      <main className="details-main">

        <Link
          to="/jobs"
          className="back-link"
        >
          ← Back to Jobs
        </Link>

        <div className="job-details-card">

          <div className="details-header">

            <div className="company-logo large">
              {job.company
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h1>
                {job.title}
              </h1>

              <h3>
                {job.company}
              </h3>
            </div>

          </div>

          <div className="details-info">

            <span>
              📍 {job.location}
            </span>

            <span>
              💼 {job.jobType}
            </span>

            <span>
              💰 {job.salary}
            </span>

            <span>
              🏷️ {job.category}
            </span>

          </div>

          <hr />

          <h2>
            Job Description
          </h2>

          <p className="description">
            {job.description}
          </p>

          <h2>
            Required Skills
          </h2>

          <div className="skills">
            {job.skills?.map(
              (skill) => (
                <span
                  key={skill}
                  className="skill-tag"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          <button
            className="apply-btn"
            onClick={applyForJob}
          >
            Apply Now
          </button>

        </div>

      </main>

    </div>
  );
}

export default JobDetails;