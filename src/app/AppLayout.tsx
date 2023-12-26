import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}
