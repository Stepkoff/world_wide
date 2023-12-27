import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'
import s from './appLayout.module.sass'

export const AppLayout = () => {
  return (
    <div className={s.appLayout}>
      <Header/>
      <Outlet/>
    </div>
  )
}
