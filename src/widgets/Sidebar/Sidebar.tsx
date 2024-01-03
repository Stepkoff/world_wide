import s from './Sidebar.module.sass'
import {Outlet} from "react-router-dom";
import {Logo} from "@/shared/ui/Logo";
import {AppNav} from "@/shared/ui/AppNav";

export const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <Logo />
      <AppNav/>

      <Outlet/>

      <footer className={s.footer}>
        <p className={s.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};