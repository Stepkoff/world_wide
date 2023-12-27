import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

export enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'DARK'
}

interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.SYSTEM,
  setTheme: () => {}
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme ?? Theme.SYSTEM)
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  console.log(theme)
  const onWindowMatch = () => {
    if(localStorage.theme === 'dark' || (!(theme in localStorage) && darkQuery.matches)) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }

  const handleChangeDarkQuery = (e:MediaQueryListEvent) => {
    if(!('theme' in localStorage)) {
      if(e.matches) {
        element.classList.add('dark')
      } else {
        element.classList.remove('dark')
      }
    }
  }

  useEffect(() => {
    switch (theme) {
      case Theme.DARK:
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark')
        break;
      case Theme.LIGHT:
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        onWindowMatch()
        break;
    }

    darkQuery.addEventListener('change', handleChangeDarkQuery)
    return () => {
      darkQuery.removeEventListener('change', handleChangeDarkQuery)
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);