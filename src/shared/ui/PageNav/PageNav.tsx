import s from './PageNav.module.sass'
import {Logo} from "@/shared/ui/Logo";
import {NavLink} from "react-router-dom";
import {ToggleTheme} from "@/widgets/ThemeToggle";

export const PageNav = () => {
  return (
    <nav className={s.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={s.ctaLink}>
            Login
          </NavLink>
        </li>
        <li>
          <ToggleTheme/>
        </li>
      </ul>
    </nav>
  );
}

