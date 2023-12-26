import {useEffect, useRef, useState} from "react";
import {MenuModal} from "@/shared/ui/MenuModal";

export const ToggleTheme = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<'light'|'dark'| 'system'>(
    // eslint-disable-next-line
    // @ts-expect-error
    localStorage.getItem('theme') ?? 'system'
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  
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
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark')
        break;
      case 'light':
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

  const setLightTheme = () => {
    setTheme('light')
  }
  const setDarkTheme = () => {
    setTheme('dark')
  }
  const setSystemPreferences = () => {
    setTheme('system')
  }

  return (
    <div className={''}>
      <button ref={triggerRef} onClick={() => setModalOpened(true)}>Theme</button>
      <MenuModal elemRef={triggerRef} isOpened={modalOpened} onClose={() => setModalOpened(false)}>
        <div>
          <button onClick={setSystemPreferences}>system</button>
          <button onClick={setLightTheme}>light</button>
          <button onClick={setDarkTheme}>dark</button>
        </div>
      </MenuModal>
    </div>
  );
};