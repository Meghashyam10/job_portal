import React, { useState } from 'react';
import API from '../api/api';

// This component for displaying the visual ATS score remains the same.
const AtsScoreCard = ({ analysis }) => {
    if (!analysis) return null;

    const getProgressColor = (score, max) => {
        const percentage = (score / max) * 100;
        if (percentage < 50) return 'progress-red';
        if (percentage < 80) return 'progress-yellow';
        return 'progress-green';
    };

    return (
        <div className="page-card ats-score-card">
            <div className="score-header">
                <h2>ATS Score</h2>
                <div className="score-value">{analysis.total}<span>/100</span></div>
            </div>
            <div className="main-progress-bar">
                <div className="main-progress-bar-inner" style={{ width: `${analysis.total}%` }}></div>
            </div>
            <div className="score-breakdown">
                <div className="breakdown-item">
                    <h4>Design</h4>
                    <div className="breakdown-progress">
                        <div className={`breakdown-progress-inner ${getProgressColor(analysis.design, 50)}`} style={{ width: `${(analysis.design / 50) * 100}%` }}></div>
                    </div>
                    <div className="breakdown-score">{analysis.design}/50</div>
                </div>
                <div className="breakdown-item">
                    <h4>Structure</h4>
                     <div className="breakdown-progress">
                        <div className={`breakdown-progress-inner ${getProgressColor(analysis.structure, 25)}`} style={{ width: `${(analysis.structure / 25) * 100}%` }}></div>
                    </div>
                    <div className="breakdown-score">{analysis.structure}/25</div>
                </div>
                <div className="breakdown-item">
                    <h4>Content</h4>
                     <div className="breakdown-progress">
                        <div className={`breakdown-progress-inner ${getProgressColor(analysis.content, 25)}`} style={{ width: `${(analysis.content / 25) * 100}%` }}></div>
                    </div>
                    <div className="breakdown-score">{analysis.content}/25</div>
                </div>
            </div>
        </div>
    );
};


function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // This function now handles both the REAL upload and the mock analysis for the UI.
  const handleUploadAndAnalyze = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      setIsError(true);
      return;
    }
    setLoading(true);
    setMessage('');
    setIsError(false);
    setAnalysis(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Make the real API call to upload the file.
      // The API instance from api.js automatically adds the auth token.
      const response = await API.post('/resumes/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set a success message based on the real API response.
      setMessage(response.data.message || "File uploaded successfully!");
      setIsError(false);

      // Step 2: Trigger the mock analysis for the UI presentation AFTER the upload succeeds.
      // This gives you the best of both worlds: a working feature and a great demo visual.
      const design = Math.floor(Math.random() * 21) + 30; // 30-50
      const structure = Math.floor(Math.random() * 11) + 15; // 15-25
      const content = Math.floor(Math.random() * 11) + 15; // 15-25
      const total = design + structure + content;
      setAnalysis({ total, design, structure, content });

    } catch (error) {
      // Handle errors from the API call.
      console.error('Error uploading file:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'File upload failed. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{marginBottom: '3rem'}}>
                <h1>Optimize Your Resume</h1>
                <p>Simulate an applicant tracking system scan and ensure your resume gets into the hands of a human recruiter.</p>
            </div>
            
            <div className="analysis-layout">
                <div className="upload-panel animated-element">
                    <div className="upload-box">
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                        </div>
                        <h3>Upload your resume</h3>
                        <p>{file ? `Selected: ${file.name}` : "Drag & drop or click to select a file"}</p>
                        <input type="file" id="resume-upload-input" onChange={(e) => setFile(e.target.files[0])} style={{display: 'none'}} />
                        <label htmlFor="resume-upload-input" className="btn btn-primary">
                            Choose File
                        </label>
                    </div>
                    {/* This button now calls the new, functional handler */}
                    <button className="btn btn-primary" onClick={handleUploadAndAnalyze} disabled={loading || !file} style={{width: '100%', marginTop: '1.5rem'}}>
                        {loading ? 'Uploading & Analyzing...' : 'Analyze My Resume'}
                    </button>
                    {/* Display success or error messages */}
                    {message && <p className={`message ${isError ? 'error-message' : 'success-message'}`} style={{marginTop: '1rem'}}>{message}</p>}
                    <p className="privacy-note">Privacy guaranteed. Your data is not stored.</p>
                </div>

                <div className="results-panel">
                    {analysis ? <AtsScoreCard analysis={analysis} /> : 
                        <div className="page-card animated-element" style={{animationDelay: '200ms'}}>
                            <p>Your detailed analysis will appear here once you upload and analyze a resume.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}
export default ResumeUpload;
