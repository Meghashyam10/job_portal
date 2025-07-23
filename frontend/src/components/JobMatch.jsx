import React, { useState } from 'react';
import API from '../api/api';

function JobMatch() {
  const [resumeId, setResumeId] = useState('');
  const [jobId, setJobId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (!resumeId || !jobId) {
        setError('Please provide both a Resume ID and a Job ID.');
        return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
        const res = await API.post('resume/match/', { resume_id: resumeId, job_id: jobId });
        setResult(res.data);
    } catch (err) {
        setError('Failed to fetch match results. Please check the IDs and try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>Match Resume to Job</h1>
                <p>Enter the specific ID for a resume and a job to get a detailed match analysis.</p>
            </div>

            <div className="match-controls-container animated-element" style={{animationDelay: '200ms'}}>
                <div className="match-control-group">
                    <label htmlFor="resumeId" className="form-label">Resume ID</label>
                    <input id="resumeId" type="number" placeholder="Enter Resume ID" value={resumeId} onChange={(e) => setResumeId(e.target.value)} className="form-input" />
                </div>
                <div className="match-control-group">
                    <label htmlFor="jobId" className="form-label">Job ID</label>
                    <input id="jobId" type="number" placeholder="Enter Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} className="form-input" />
                </div>
                <button className="btn btn-primary" onClick={handleMatch} disabled={loading}>
                    {loading ? 'Matching...' : 'Check Match'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {result && (
                <div className="match-results-container">
                    <div className="match-card">
                        <div className="match-card-header">
                            <div><h3 className="match-card-title">Match Result</h3></div>
                            <div className="match-score">{result.score}%</div>
                        </div>
                        <div className="match-keywords">
                            <p><strong>Matched Keywords:</strong></p>
                            <div className="keywords-list">
                                {result.matched_keywords.map(kw => <span key={kw} className="keyword-tag matched">{kw}</span>)}
                            </div>
                        </div>
                        <div className="match-keywords">
                            <p><strong>Missing Keywords:</strong></p>
                            <div className="keywords-list">
                                {result.missing_keywords.map(kw => <span key={kw} className="keyword-tag missing">{kw}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default JobMatch;
