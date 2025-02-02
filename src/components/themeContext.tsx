import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  availableThemes: { [key: string]: { name: string; colors: { primary: string; text: string } } };
  getThemeColors: () => { primary: string; text: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('classic');

  const availableThemes = {
    classic: {
      name: 'Classic',
      colors: {
        primary: isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-100 to-gray-200',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
      },
    },
    midnight: {
      name: 'Midnight',
      colors: {
        primary: isDarkMode ? 'from-blue-900 to-blue-800' : 'from-blue-100 to-blue-200',
        text: isDarkMode ? 'text-white' : 'text-blue-900',
      },
    },
    sunset: {
      name: 'Sunset',
      colors: {
        primary: isDarkMode ? 'from-orange-900 to-orange-800' : 'from-orange-100 to-orange-200',
        text: isDarkMode ? 'text-white' : 'text-orange-900',
      },
    },
    forest: {
      name: 'Forest',
      colors: {
        primary: isDarkMode ? 'from-green-900 to-green-800' : 'from-green-100 to-green-200',
        text: isDarkMode ? 'text-white' : 'text-green-900',
      },
    },
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeColors = () => {
    return availableThemes[currentTheme].colors;
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentTheme,
        setCurrentTheme,
        availableThemes,
        getThemeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};