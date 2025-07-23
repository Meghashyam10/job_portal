import React, { useEffect, useState } from 'react';
import API from '../api/api';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('jobs/');
        setJobs(res.data);
      } catch (error) {
        console.error("Error Fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>Available Jobs</h1>
                <p>Browse the latest job openings posted on our portal.</p>
            </div>

            <div className="animated-element" style={{animationDelay: '200ms'}}>
                {loading ? (
                    <p>Loading available jobs...</p>
                ) : jobs.length === 0 ? (
                    <p>No jobs have been posted yet. Be the first!</p>
                ) : (
                    <div className="list-container">
                        {jobs.map((job) => (
                            <div key={job.id} className="list-item-card">
                                <h3>{job.title}</h3>
                                <p className="description">{job.description}</p>
                                <div className="skills-tags">
                                    <strong>Skills:</strong>
                                    {job.skills_required ? job.skills_required.split(',').map(skill => (
                                        <span key={skill.trim()} className="skill-tag">{skill.trim()}</span>
                                    )) : <span className="skill-tag">Not specified</span>}
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

export default JobList;
