import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context with a default value
const ThemeContext = createContext();

// Create a custom hook for easy access to the context
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme. It checks localStorage for a saved theme,
  // or defaults to 'light'.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('job-portal-theme');
    return savedTheme || 'light';
  });

  // Effect to apply the theme class to the body and save it to localStorage
  useEffect(() => {
    // Remove previous theme class
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Add the current theme class
    document.body.classList.add(theme + '-theme');

    // Save the theme choice to localStorage
    localStorage.setItem('job-portal-theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme and the toggle function to children components
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
