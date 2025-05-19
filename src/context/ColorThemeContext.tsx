
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type ColorTheme = 'purple' | 'blue' | 'green' | 'amber' | 'red';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  colorTheme: 'purple',
  setColorTheme: () => {},
});

export const useColorTheme = () => useContext(ColorThemeContext);

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const savedColorTheme = localStorage.getItem('colorTheme');
    return (savedColorTheme as ColorTheme) || 'purple';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all color theme classes
    root.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-amber', 'theme-red');
    
    // Add the selected theme class
    root.classList.add(`theme-${colorTheme}`);
    
    // Save the theme preference
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};
