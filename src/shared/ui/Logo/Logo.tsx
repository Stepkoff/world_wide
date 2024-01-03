import {Link} from "react-router-dom";
import s from './Logo.module.sass'

export const Logo = () => {

  return (
    <Link to="/">
      <img src="/src/shared/assets/logo.png" alt="WorldWise logo" className={s.logo} />
    </Link>
  )
}