import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Import all pages and components
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Profile from './components/Profile';
import ResumeUpload from './components/ResumeUpload';
import JobPostForm from './components/JobPostForm';
import JobList from './components/JobList';
import ResumeList from './components/ResumeList';
import JobMatch from './components/JobMatch';
import ResumeMatchAllJobs from './components/ResumeMatchAllJobs';
import MatchOnlineJobs from './components/MatchOnlineJobs';
import OnlineJobs from './components/OnlineJobs'; // <-- ADD THIS IMPORT

// --- ICONS ---
const icons = {
    profile: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    sun: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
    moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
};

// --- LAYOUT COMPONENTS ---
const AppHeader = ({ layoutStyle }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="logo" onClick={() => navigate('/home')}>HireWise</div>
                <nav className="header-nav">
                    {layoutStyle === 'header' && (
                        <div className="dropdown">
                            <span className="nav-link">More Features</span>
                            <ul className="dropdown-menu">
                                <li><Link to="/resumes" className="dropdown-item">View My Resumes</Link></li>
                                <li><Link to="/match-resume" className="dropdown-item">Match Resume to All Jobs</Link></li>
                                <li><Link to="/online-jobs" className="dropdown-item">Browse Online Jobs</Link></li>
                                <li><Link to="/match-online-jobs" className="dropdown-item">Match to Online Jobs</Link></li>
                            </ul>
                        </div>
                    )}
                    <Link to="/profile" className="nav-link">{icons.profile} My Profile</Link>
                    <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
                        {theme === 'light' ? icons.moon : icons.sun}
                    </button>
                </nav>
            </div>
        </header>
    );
};

const AppFooter = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <button onClick={handleLogout} className="logout-btn">{icons.logout} Logout</button>
                <p>&copy; 2025 HireWise. All rights reserved.</p>
            </div>
        </footer>
    );
};

const MainLayout = ({ children, layoutStyle, onToggleLayout }) => (
    <div className="app-container">
        <AppHeader layoutStyle={layoutStyle} />
        <main className="main-content">{children}</main>
        <AppFooter />
        <button className="preview-toggle" onClick={onToggleLayout}>
            Switch to {layoutStyle === 'header' ? 'Scrolling' : 'Header'} View
        </button>
    </div>
);

// --- APP ROUTING LOGIC ---
function App() {
    const { token } = useAuth();
    const [layoutStyle, setLayoutStyle] = useState('header');

    const toggleLayout = () => {
        setLayoutStyle(prev => (prev === 'header' ? 'scroll' : 'header'));
    };

    const AppRoutes = () => (
        <Routes>
            <Route path="/home" element={<HomePage layoutStyle={layoutStyle} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/post-job" element={<JobPostForm />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/resumes" element={<ResumeList />} />
            <Route path="/match-job" element={<JobMatch />} />
            <Route path="/match-resume" element={<ResumeMatchAllJobs />} />
            <Route path="/online-jobs" element={<OnlineJobs />} /> {/* <-- ADD THIS ROUTE */}
            <Route path="/match-online-jobs" element={<MatchOnlineJobs />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );

    return (
        <Routes>
            <Route path="/*" element={token ? 
                <MainLayout layoutStyle={layoutStyle} onToggleLayout={toggleLayout}>
                    <AppRoutes />
                </MainLayout>
                : 
                <Navigate to="/login" />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

// --- ROOT COMPONENT ---
function Root() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default Root;
