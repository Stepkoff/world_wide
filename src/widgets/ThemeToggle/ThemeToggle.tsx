import {useRef, useState} from "react";
import {MenuModal} from "@/shared/ui/MenuModal";
import s from './themeToggle.module.sass'
import {Theme, useTheme} from "@/features/Theme";
import { LuSunMedium } from "react-icons/lu";
import { BsFillMoonStarsFill } from "react-icons/bs";

export const ToggleTheme = () => {
  const {theme, setTheme, isSystemDark} = useTheme();
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


  const icon = theme === 'system' ? (isSystemDark() ? <BsFillMoonStarsFill/> : <LuSunMedium/>) : (theme === 'light' ? <LuSunMedium/> : <BsFillMoonStarsFill/>)

  return (
    <div className={''}>
      <button ref={triggerRef} onClick={() => setModalOpened(true)}>
        {icon}
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