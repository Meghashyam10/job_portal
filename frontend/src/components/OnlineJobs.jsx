import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

const BackButton = () => ( <Link to="/home" className="back-link" aria-label="Back to Dashboard"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></Link> );
const Watermark = ({ path }) => ( <div className="watermark-container"><svg className="watermark-svg" viewBox="0 0 24 24"><path className="base-path" d={path} /><path className="glow-path" d={path} /></svg></div> );
const globeIconPath = "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.916 17.916 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632";

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await API.get('online-jobs/');
        setJobs(res.data.results || []);
      } catch (err) { console.error("Failed to fetch online jobs:", err); } 
      finally { setLoading(false); }
    };
    fetchJobs();
  }, []);

  return (
    <div className="page-container">
        <Watermark path={globeIconPath} />
        <div className="content-wrapper">
            <header className="page-header"><BackButton /><h1>Latest Online Jobs</h1></header>
            {loading ? (
                <p className="loading-text">Searching for jobs from across the web...</p>
            ) : jobs.length === 0 ? (
                <p className="empty-text">No online jobs could be found at this time.</p>
            ) : (
                <div className="list-container">
                    {jobs.map((job, idx) => (
                        <div key={idx} className="list-item-card" style={{ animationDelay: `${idx * 70}ms` }}>
                            <div className="content">
                                <h3>{job.title}</h3>
                                <p>{job.company} - {job.location}</p>
                                <p style={{marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8}}>{job.description?.slice(0, 150)}...</p>
                            </div>
                            <div className="action">
                                <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View & Apply</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}
export default OnlineJobs;
