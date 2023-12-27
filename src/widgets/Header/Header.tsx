import s from './header.module.sass'
import {NavLink} from "react-router-dom";
import {ToggleTheme} from "@/widgets/ThemeToggle";
import {MaxWidthWrapper} from "@/shared/ui/MaxWidthWrapper";

const activeNavLink = ({isActive}: {isActive: boolean}) => isActive ? `${s.link} ${s.active}` : s.link

export const Header = () => {
  return (
    <div className={s.header}>
      <MaxWidthWrapper>
        <nav>
          <ul className={s.list}>
            <li><NavLink className={activeNavLink} to={'/'}>Home</NavLink></li>
            <li><NavLink className={activeNavLink} to={'/pricing'}>Pricing</NavLink></li>
            <li><NavLink className={activeNavLink} to={'/product'}>Product</NavLink></li>
            <ToggleTheme/>
          </ul>
        </nav>
      </MaxWidthWrapper>
    </div>
  )
}
