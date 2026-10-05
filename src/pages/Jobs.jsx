import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredJobs = jobs.filter((job) => {
    const text = `
      ${job.title}
      ${job.company}
      ${job.location}
      ${job.category}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Job<span>Hub</span>
        </div>

        <div className="nav-links">
          <Link to="/jobs">Jobs</Link>

          {token && <Link to="/applications">My Applications</Link>}

          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Discover opportunities and take the next step in your career.</p>

        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main className="jobs-container">
        <h2>Latest Jobs</h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h3>{job.title}</h3>

                <h4>{job.company}</h4>

                <p>📍 {job.location}</p>
                <p>💼 {job.jobType}</p>

                {job.salary && <p>💰 {job.salary}</p>}

                <Link to={`/jobs/${job._id}`} className="view-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Jobs;