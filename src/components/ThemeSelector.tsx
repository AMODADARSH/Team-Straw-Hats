import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '../components/themeContext';

export default function ThemeSelector() {
  const { isDarkMode, toggleDarkMode, currentTheme, setCurrentTheme, availableThemes } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-lg">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-gray-800'
          }`}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className="relative group">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Select theme"
          >
            <Palette size={20} />
          </button>
          
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-white-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            {Object.entries(availableThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-300 ${
                  currentTheme === key ? 'bg-gray-100 dark:bg-gray-500' : ''
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}