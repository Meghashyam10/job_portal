import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth to use the login function

// This component contains all the styles needed for the Register page.
const RegisterStyles = () => (
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

        .register-page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            background-color: var(--bg-tertiary);
            font-family: var(--font-primary);
        }
        .register-logo {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent-primary);
            font-family: var(--font-secondary);
            margin-bottom: 2rem;
        }
        .register-card {
            background: var(--glass-bg);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px 0 var(--shadow-color);
            border-radius: 16px;
            padding: 2.5rem;
            width: 100%;
            max-width: 450px;
            box-sizing: border-box;
        }
        .register-card h2 {
            text-align: center;
            font-family: var(--font-primary);
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: var(--text-primary);
        }
        .register-form-group { margin-bottom: 1.5rem; }
        .register-form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; color: var(--text-secondary); text-align: left; }
        .register-form-input { width: 100%; box-sizing: border-box; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-primary); color: var(--text-primary); font-size: 1rem; }
        .register-btn { width: 100%; margin-top: 1rem; display: inline-block; font-weight: 600; font-size: 1rem; text-align: center; padding: 16px 32px; border-radius: 8px; border: none; cursor: pointer; background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary)); color: var(--btn-text-color); }
        .register-form-link { text-align: center; margin-top: 2rem; font-size: 0.9rem; }
        .register-error-message { color: #e53e3e; background-color: #fed7d7; border: 1px solid #f56565; padding: 0.75rem 1rem; border-radius: 8px; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; }
    `}</style>
);

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email }),
        });
        const data = await response.json();
        if (response.ok) {
            // THIS IS THE FIX: Use the login function to update state
            login(data.token);
            navigate('/home');
        } else {
            setError(JSON.stringify(data));
        }
    } catch (err) {
        setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <RegisterStyles />
      <div className="register-page-container">
        <h1 className="register-logo">JobPortal</h1>
        <div className="register-card">
            <h2>Create Your Account</h2>
            <form onSubmit={handleRegister}>
                <div className="register-form-group">
                    <label className="register-form-label">Username</label>
                    <input type="text" className="register-form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                 <div className="register-form-group">
                    <label className="register-form-label">Email Address</label>
                    <input type="email" className="register-form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="register-form-group">
                    <label className="register-form-label">Password</label>
                    <input type="password" className="register-form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="register-btn">Register</button>
                {error && <p className="register-error-message">{error}</p>}
            </form>
             <p className="register-form-link">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
      </div>
    </>
  );
}

export default Register;
