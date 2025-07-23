import React, { useEffect, useState } from 'react';
import API from '../api/api';

function MatchOnlineJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
        setError("Could not load your resumes.");
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!resumeId || !query) {
        setError("Please select a resume and enter a job query.");
        return;
    }
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await API.post('match-online-jobs/', {
        resume_id: resumeId,
        query: query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      setError("An error occurred while matching online jobs.");
      console.error('Error matching online jobs:', err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>Match with Online Jobs</h1>
                <p>Use your resume to find and score matching jobs from across the web.</p>
            </div>

            <div className="match-controls-container animated-element" style={{animationDelay: '200ms'}}>
                <div className="match-control-group">
                    <label htmlFor="resume-select" className="form-label">Select Your Resume</label>
                    <select id="resume-select" value={resumeId} onChange={(e) => setResumeId(e.target.value)} className="form-input">
                        <option value="">-- Choose Resume --</option>
                        {resumes.map((resume) => (
                            <option key={resume.id} value={resume.id}>{resume.file_name || resume.file.split("/").pop()}</option>
                        ))}
                    </select>
                </div>
                <div className="match-control-group">
                    <label htmlFor="query-input" className="form-label">Job Title or Keyword</label>
                    <input id="query-input" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., Python Developer" className="form-input" />
                </div>
                <button onClick={handleMatch} disabled={!resumeId || loading} className="btn btn-primary">
                    {loading ? 'Searching...' : 'Search Online Jobs'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {results.length > 0 && (
                <div className="match-results-container">
                    <h2 className="match-results-header">Matching Jobs Found Online</h2>
                    {results.map((job, idx) => (
                        <div key={idx} className="match-card" style={{ animationDelay: `${idx * 70}ms` }}>
                            <div className="match-card-header">
                                <div>
                                    <h3 className="match-card-title">{job.job_title}</h3>
                                    <p className="match-card-company">{job.company}</p>
                                </div>
                                <div className="match-score">{job.score}%</div>
                            </div>
                            <div className="match-keywords">
                                <p><strong>Matched Keywords:</strong></p>
                                <div className="keywords-list">
                                    {job.matched_keywords.map(kw => <span key={kw} className="keyword-tag matched">{kw}</span>)}
                                </div>
                            </div>
                            <div className="match-keywords">
                                <p><strong>Missing Keywords:</strong></p>
                                <div className="keywords-list">
                                    {job.missing_keywords.map(kw => <span key={kw} className="keyword-tag missing">{kw}</span>)}
                                </div>
                            </div>
                            <div style={{marginTop: '1.5rem', textAlign: 'right'}}>
                                <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default MatchOnlineJobs;
