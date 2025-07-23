import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ layoutStyle }) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated-element');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.section-content, .section-image');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, [layoutStyle]);

    return (
        <div className="page-content">
            {/* --- Section 1: Upload Resume --- */}
            <section className="page-section">
                <div className="content-wrapper">
                    <div className="section-grid">
                        <div className="section-content">
                            <h1>Optimize your resume for ATS scanners.</h1>
                            <p>Get invited to more interviews. Our checker simulates an ATS scan to ensure your resume always gets into the hands of a human recruiter.</p>
                            <Link to="/upload" className="btn btn-primary">Upload Your Resume</Link>
                        </div>
                        <div className="section-image">
                            <div className="section-visual-card">
                                <h3>ATS Score Analysis</h3>
                                <div className="card-stat">
                                    <span className="label">Overall Score</span>
                                    <span className="value">87/100</span>
                                </div>
                                <div className="card-stat">
                                    <span className="label">Keywords</span>
                                    <span className="value">92%</span>
                                </div>
                                <div className="card-stat">
                                    <span className="label">Formatting</span>
                                    <span className="value">Good</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 2: Post a Job --- */}
            <section className="page-section" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <div className="content-wrapper">
                    <div className="section-grid reverse">
                        <div className="section-content">
                            <h2>Find and attract top-tier talent.</h2>
                            <p>Our platform helps you craft the perfect job description and reach qualified candidates who are the best fit for your open roles.</p>
                            <Link to="/post-job" className="btn btn-primary">Post a New Job</Link>
                        </div>
                        <div className="section-image">
                           <div className="section-visual-card">
                                <h3>Job Posting Preview</h3>
                                <p><strong>Title:</strong> Senior Frontend Developer</p>
                                <p><strong>Skills:</strong> React, TypeScript, GraphQL</p>
                                <p style={{marginTop: '1rem'}}>Create a posting and instantly connect with a curated list of matching candidates.</p>
                           </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* --- Section 3: View Available Jobs --- */}
            <section className="page-section">
                <div className="content-wrapper">
                    <div className="section-grid">
                        <div className="section-content">
                            <h2>Find Your Perfect Match, Instantly.</h2>
                            <p>Browse thousands of jobs on our portal, or let our AI match your optimized resume to the best opportunities from across the web.</p>
                            <Link to="/jobs" className="btn btn-primary">View Available Jobs</Link>
                        </div>
                        <div className="section-image">
                             <div className="section-visual-card">
                                <h3>Live Job Feed</h3>
                                <p><strong>New Today:</strong> 124 jobs</p>
                                <p><strong>Top Skill in Demand:</strong> Python</p>
                                <p style={{marginTop: '1rem'}}>Our database is updated in real-time with new opportunities.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONDITIONAL SCROLLING SECTIONS --- */}
            {layoutStyle === 'scroll' && (
                <>
                    {/* --- Section 4: View My Resumes --- */}
                    <section className="page-section" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        <div className="content-wrapper">
                            <div className="section-grid reverse">
                                <div className="section-content">
                                    <h2>Manage Your Career Documents</h2>
                                    <p>Keep all your resumes in one place. View, download, or update them anytime to stay prepared for your next application.</p>
                                    <Link to="/resumes" className="btn btn-primary">View My Resumes</Link>
                                </div>
                                <div className="section-image">
                                    <div className="section-visual-card">
                                        <h3>Document Hub</h3>
                                        <p><strong>Resumes on File:</strong> 3</p>
                                        <p><strong>Last Upload:</strong> July 23, 2025</p>
                                        <p style={{marginTop: '1rem'}}>Securely store and access all your career-related files in one place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- Section 5: Match Resume to All Jobs --- */}
                    <section className="page-section">
                        <div className="content-wrapper">
                            <div className="section-grid">
                                <div className="section-content">
                                    <h2>Automated Job Matching</h2>
                                    <p>Select a resume and let our powerful AI scan every job on the portal to find the roles that are the best fit for your skills and experience.</p>
                                    <Link to="/match-resume" className="btn btn-primary">Match Resume to All Jobs</Link>
                                </div>
                                <div className="section-image">
                                    <div className="section-visual-card">
                                        <h3>Matching Analysis</h3>
                                        <p><strong>Best Match Score:</strong> 94%</p>
                                        <p><strong>Top Company Match:</strong> Tech Solutions Inc.</p>
                                        <p style={{marginTop: '1rem'}}>Our AI finds the best opportunities for you based on your unique skills.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default HomePage;
