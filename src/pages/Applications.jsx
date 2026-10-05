import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5002/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setApplications(response.data);
    } catch (error) {
      console.error(error);

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-container">

      <nav className="navbar">

        <h2>Job Hub</h2>

        <div className="nav-links">
          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/applications">
            My Applications
          </Link>
        </div>

      </nav>

      <main className="applications-main">

        <h1>
          My Applications
        </h1>

        <p className="page-subtitle">
          Track the jobs you have applied for.
        </p>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <div className="empty-state">

            <h3>
              No applications yet
            </h3>

            <p>
              Browse jobs and apply for
              your first opportunity.
            </p>

            <Link
              to="/jobs"
              className="view-job-btn"
            >
              Browse Jobs
            </Link>

          </div>
        ) : (
          <div className="applications-list">

            {applications.map(
              (application) => (

                <div
                  className="application-card"
                  key={application._id}
                >

                  <div>
                    <h3>
                      {application.job?.title}
                    </h3>

                    <h4>
                      {application.job?.company}
                    </h4>

                    <p>
                      📍{" "}
                      {application.job?.location}
                    </p>

                    <small>
                      Applied on{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </small>
                  </div>

                  <span
                    className={`status ${application.status
                      .toLowerCase()
                      .replace(
                        " ",
                        "-"
                      )}`}
                  >
                    {application.status}
                  </span>

                </div>

              )
            )}

          </div>
        )}

      </main>

    </div>
  );
}

export default Applications;