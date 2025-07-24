import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../api/api'; // <-- IMPORT THE CENTRAL API INSTANCE

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // --- THIS IS THE FIX ---
        // The API instance now handles the URL and authentication token automatically.
        const response = await API.get("/resumes/");
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="page-content">
        <div className="content-wrapper" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="section-content animated-element" style={{ marginBottom: '3rem' }}>
                <h1 style={{fontSize: '3rem'}}>My Resumes</h1>
                <p>Here are all the resumes you have uploaded to the portal.</p>
            </div>

            <div className="animated-element" style={{animationDelay: '200ms'}}>
                {loading ? (
                    <p>Loading your resumes...</p>
                ) : resumes.length === 0 ? (
                    <p>You haven't uploaded any resumes yet.</p>
                ) : (
                    <div className="list-container">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="list-item-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{width: '2rem', height: '2rem', color: 'var(--accent-primary)', flexShrink: 0}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    {/* Use the resume_name from the serializer */}
                                    <h3>{resume.resume_name || `Resume ID: ${resume.id}`}</h3>
                                </div>
                                <a
                                    href={resume.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    View
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ResumeList;
