import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Keep this for potential future back buttons

// This component contains all the styles needed for the Job Post Form page.
const JobPostFormStyles = () => (
    <style>{`
        /* Using the same theme variables for consistency */
        :root {
            --font-primary: 'Poppins', sans-serif;
            --font-secondary: 'Lora', serif;
        }
        .light-theme {
            --bg-primary: #F5F5DC; --bg-secondary: #ffffff; --bg-tertiary: #faf8f0;
            --text-primary: #4b0018; --text-secondary: #6d4a2a;
            --accent-primary: #800020; --accent-secondary: #B8860B;
            --border-color: #e0d9c8; --shadow-color: rgba(109, 74, 42, 0.1);
            --btn-text-color: #FFFFFF; --glow-color: rgba(184, 134, 11, 0.3);
            --glass-bg: rgba(255, 255, 255, 0.7);
        }
        .dark-theme {
            --bg-primary: #2c000c; --bg-secondary: #4a0017; --bg-tertiary: #3a0012;
            --text-primary: #F5F5DC; --text-secondary: #d4c8a8;
            --accent-primary: #e7ad4e; --accent-secondary: #F5F5DC;
            --border-color: #601028; --shadow-color: rgba(0, 0, 0, 0.2);
            --btn-text-color: #2c000c; --glow-color: rgba(231, 173, 78, 0.4);
            --glass-bg: rgba(74, 0, 23, 0.6);
        }

        /* Scoped styles for the Job Post page */
        .job-post-page-container {
            padding: 4rem 2rem;
            background-color: var(--bg-primary);
            font-family: var(--font-primary);
        }
        .job-post-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }
        .job-post-header h1 {
            font-size: 3rem;
            font-family: var(--font-secondary);
            color: var(--text-primary);
        }
        .job-post-header p {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }
        .job-post-card {
            background: var(--glass-bg);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px 0 var(--shadow-color);
            border-radius: 16px;
            padding: 2.5rem;
        }
        .job-post-form-group { margin-bottom: 1.5rem; }
        .job-post-form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; color: var(--text-secondary); text-align: left; }
        .job-post-form-input { width: 100%; box-sizing: border-box; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-tertiary); color: var(--text-primary); font-size: 1rem; }
        .job-post-form-textarea { min-height: 120px; resize: vertical; }
        .job-post-btn { width: 100%; margin-top: 1rem; display: inline-block; font-weight: 600; font-size: 1rem; text-align: center; padding: 16px 32px; border-radius: 8px; border: none; cursor: pointer; background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary)); color: var(--btn-text-color); }
        .job-post-message { padding: 0.75rem 1rem; border-radius: 8px; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; }
        .job-post-message.success { color: #2f855a; background-color: #c6f6d5; border: 1px solid #38a169; }
        .job-post-message.error { color: #e53e3e; background-color: #fed7d7; border: 1px solid #f56565; }
    `}</style>
);

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to post a job.');
      setIsError(true);
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/jobs/',
        { title, description, skills_required: skillsRequired },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessage('Success! Job posted successfully.');
      setTitle('');
      setDescription('');
      setSkillsRequired('');
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      setMessage('Failed to post job. Please try again.');
      setIsError(true);
    }
  };

  return (
    <>
      <JobPostFormStyles />
      <div className="job-post-page-container">
        <div className="job-post-wrapper">
            <div className="job-post-header">
                <h1>Post a New Job</h1>
                <p>Fill out the details below to find the perfect candidate for your open role.</p>
            </div>
            
            <div className="job-post-card">
                 <form onSubmit={handleSubmit}>
                    <div className="job-post-form-group">
                        <label htmlFor="title" className="job-post-form-label">Job Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g., Senior Frontend Developer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="job-post-form-input"
                            required
                        />
                    </div>
                    <div className="job-post-form-group">
                        <label htmlFor="description" className="job-post-form-label">Job Description</label>
                        <textarea
                            id="description"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="job-post-form-input job-post-form-textarea"
                            required
                        />
                    </div>
                    <div className="job-post-form-group">
                        <label htmlFor="skills" className="job-post-form-label">Skills Required</label>
                        <input
                            id="skills"
                            type="text"
                            placeholder="e.g., React, TypeScript, GraphQL (comma separated)"
                            value={skillsRequired}
                            onChange={(e) => setSkillsRequired(e.target.value)}
                            className="job-post-form-input"
                        />
                    </div>

                    <button type="submit" className="job-post-btn">
                        Submit Job Posting
                    </button>

                    {message && 
                        <p className={`job-post-message ${isError ? 'error' : 'success'}`}>
                            {message}
                        </p>
                    }
                </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default JobPostForm;
