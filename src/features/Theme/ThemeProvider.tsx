import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from "react";

export enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark'
}

interface ThemeType {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  isSystemDark: () => boolean
}
const ThemeContext = createContext<ThemeType>({
  theme: Theme.SYSTEM,
  setTheme: () => {},
  isSystemDark: () => false
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [, triggerRerender] = useReducer(prev => prev+1, 0)
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme ?? Theme.SYSTEM)
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  // const [themeIcon, setThemeIcon] =
  //   useState<'light' | 'dark'>(theme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : (theme === 'light' ? 'light' : 'dark'))

  const onWindowMatch = () => {
    if(localStorage.theme === 'dark' || (!(theme in localStorage) && darkQuery.matches)) {
      element.classList.add('dark')
      // setThemeIcon('dark')
    } else {
      element.classList.remove('dark')
      // setThemeIcon('light')
    }
    triggerRerender()
  }

  const isSystemDark = () => element.classList.contains('dark')

  const handleChangeDarkQuery = (e:MediaQueryListEvent) => {
    if(!('theme' in localStorage)) {
      if(e.matches) {
        element.classList.add('dark')
        // setThemeIcon('dark')
      } else {
        element.classList.remove('dark')
        // setThemeIcon('light')
      }
    }
    triggerRerender()
  }

  useEffect(() => {
    switch (theme) {
      case Theme.DARK:
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark')
        // setThemeIcon('dark')
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        // setThemeIcon('light')
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
    <ThemeContext.Provider value={{theme: theme, setTheme: setTheme, isSystemDark}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);