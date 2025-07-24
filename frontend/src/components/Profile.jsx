import React, { useEffect, useState } from "react";
import API from '../api/api'; // <-- IMPORT THE CENTRAL API INSTANCE

// The styles component remains the same.
const ProfileStyles = () => (
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
            --glass-bg: rgba(255, 255, 255, 0.7);
        }
        .dark-theme {
            --bg-primary: #2c000c; --bg-secondary: #4a0017; --bg-tertiary: #3a0012;
            --text-primary: #F5F5DC; --text-secondary: #d4c8a8;
            --accent-primary: #e7ad4e; --accent-secondary: #F5F5DC;
            --border-color: #601028; --shadow-color: rgba(0, 0, 0, 0.2);
            --glass-bg: rgba(74, 0, 23, 0.6);
        }

        /* Scoped styles for the Profile page */
        .profile-page-container {
            padding: 4rem 2rem;
            background-color: var(--bg-primary);
            font-family: var(--font-primary);
            min-height: 100vh;
        }
        .profile-wrapper {
            max-width: 800px;
            margin: 0 auto;
        }
        .profile-header h1 {
            font-size: 3rem;
            font-family: var(--font-secondary);
            color: var(--text-primary);
        }
        .profile-header p {
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }
        .profile-card {
            background: var(--glass-bg);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 32px 0 var(--shadow-color);
            border-radius: 16px;
            padding: 2.5rem 3rem;
        }
        .profile-card p {
            font-size: 1.1rem;
            font-family: var(--font-primary);
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-primary);
        }
        .profile-card p:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .profile-card strong {
            font-weight: 500;
            color: var(--text-secondary);
        }
    `}</style>
);


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // The token is now added automatically by the API instance, so we don't need it here.
      try {
        // --- THIS IS THE FIX ---
        // We now use the central 'API' instance.
        const response = await API.get("/profile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
        <ProfileStyles />
        <div className="profile-page-container">
            <div className="profile-wrapper">
                <div className="profile-header">
                    <h1>My Profile</h1>
                    <p>Here are your account details.</p>
                </div>

                <div>
                    {loading ? (
                        <p>Loading profile...</p>
                    ) : profile ? (
                        <div className="profile-card">
                            <p><strong>User ID:</strong> {profile.id}</p>
                            <p><strong>Username:</strong> {profile.username}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </div>
                    ) : (
                        <p>Could not load profile. Please ensure you are logged in.</p>
                    )}
                </div>
            </div>
        </div>
    </>
  );
};

export default Profile;
