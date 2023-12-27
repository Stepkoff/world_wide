import {useRef, useState} from "react";
import {MenuModal} from "@/shared/ui/MenuModal";
import s from './themeToggle.module.sass'
import {Theme, useTheme} from "@/features/Theme";

export const ToggleTheme = () => {
  const {theme, setTheme} = useTheme();
  const [modalOpened, setModalOpened] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null);

  const setLightTheme = () => {
    setTheme(Theme.LIGHT)
  }
  const setDarkTheme = () => {
    setTheme(Theme.DARK)
  }
  const setSystemPreferences = () => {
    setTheme(Theme.SYSTEM)
  }


  return (
    <div className={''}>
      <button ref={triggerRef} onClick={() => setModalOpened(true)}>
        theme
      </button>
      <MenuModal elemRef={triggerRef} isOpened={modalOpened} onClose={() => setModalOpened(false)}>
        <div className={s.menuContainer}>
          <button onClick={setSystemPreferences}>system</button>
          <button onClick={setLightTheme}>light</button>
          <button onClick={setDarkTheme}>dark</button>
        </div>
      </MenuModal>
    </div>
  );
};