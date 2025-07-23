import React, { useEffect, useState } from 'react';
import API from '../api/api';

function ResumeMatchAllJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error("Failed to fetch resumes", err);
        setError("Could not load your resumes.");
      }
    };
    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    if (!resumeId) {
        setError("Please select a resume to match.");
        return;
    }
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const selected = resumes.find(r => r.id.toString() === resumeId);
      setSelectedResumeName(selected?.file_name || `Resume ID: ${resumeId}`);
      const res = await API.get(`resumes/${resumeId}/match_jobs/`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Matching failed", err);
      setError("An error occurred while matching jobs.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>Match Resume to All Jobs</h1>
                <p>Select one of your resumes to see how it scores against all available jobs on the portal.</p>
            </div>

            <div className="match-controls-container animated-element" style={{animationDelay: '200ms'}}>
                <div className="match-control-group">
                    <label htmlFor="resume-select" className="form-label">Select a Resume</label>
                    <select id="resume-select" onChange={(e) => setResumeId(e.target.value)} value={resumeId} className="form-input">
                        <option value="">-- Choose Resume --</option>
                        {resumes.map((r) => (
                            <option key={r.id} value={r.id}>{r.file_name || r.file.split("/").pop()}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleMatchAll} className="btn btn-primary" disabled={!resumeId || loading}>
                    {loading ? 'Matching...' : 'Find Best Matches'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {results.length > 0 && (
                <div className="match-results-container">
                    <h2 className="match-results-header">Top Matches for <span>{selectedResumeName}</span></h2>
                    {results.map((job, index) => (
                        <div className="match-card" key={index} style={{ animationDelay: `${index * 70}ms` }}>
                            <div className="match-card-header">
                                <div><h3 className="match-card-title">{job.job_title}</h3></div>
                                <div className="match-score">{job.match_score}%</div>
                            </div>
                             <div className="match-keywords">
                                <p><strong>Matched Skills:</strong></p>
                                <div className="keywords-list">
                                    {job.matched_skills.map(kw => <span key={kw} className="keyword-tag matched">{kw}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default ResumeMatchAllJobs;
