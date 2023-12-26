import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { HomePage } from '@/pages/HomePage'
import { ProductPage } from '@/pages/ProductPage'
import { PricingPage } from '@/pages/PricingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {ErrorPage} from "@/pages/ErrorPage";


const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<ErrorPage/>} path='/' element={<AppLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path='/product' element={<ProductPage/>} />
    <Route path='/pricing' element={<PricingPage/>} />
    <Route path='*' element={<NotFoundPage/>} />
  </Route>
))

export const App = () => {


  return (
    <RouterProvider router={router} />
  )
}
