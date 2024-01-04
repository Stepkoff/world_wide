import {Link} from "react-router-dom";
import s from './Logo.module.sass'
import logoImg from '@/shared/assets/logo.png'

export const Logo = () => {

  return (
    <Link to="/">
      <img src={logoImg} alt="WorldWise logo" className={s.logo} />
    </Link>
  )
}