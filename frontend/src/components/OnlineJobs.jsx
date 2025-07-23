import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

// NOTE: The large Watermark and custom BackButton have been removed for a cleaner look.

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await API.get('online-jobs/');
        setJobs(res.data.results || []);
      } catch (err) { 
        console.error("Failed to fetch online jobs:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchJobs();
  }, []);

  return (
    // This structure now matches the simple and clean layout of your other list pages.
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>Latest Online Jobs</h1>
                <p>Browse the latest job openings from across the web, updated in real-time.</p>
            </div>

            <div className="animated-element" style={{animationDelay: '200ms'}}>
                {loading ? (
                    <p>Searching for jobs from across the web...</p>
                ) : jobs.length === 0 ? (
                    <p>No online jobs could be found at this time.</p>
                ) : (
                    <div className="list-container">
                        {jobs.map((job, idx) => (
                            <div key={idx} className="list-item-card">
                                <h3>{job.title}</h3>
                                <p className="description">{job.company} - {job.location}</p>
                                <div className="skills-tags">
                                    <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        View & Apply
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
export default OnlineJobs;
