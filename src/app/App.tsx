import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  Navigate
} from 'react-router-dom'
import { MainLayout } from './MainLayout.tsx'
import { ProductPage } from '@/pages/ProductPage'
import { PricingPage } from '@/pages/PricingPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {HomePage} from "@/pages/HomePage";
import {ErrorPage} from "@/pages/ErrorPage";
import {lazy, PropsWithChildren, Suspense, useEffect} from "react";
import {SpinnerFullPage} from "@/shared/ui/SpinnerFullPage";
import {LoginPage} from "@/pages/LoginPage";
import {useAuth} from "@/features/AuthFake";
import {Form} from "@/shared/ui/Form";
import {CountryList} from "@/entities/Country";
import {City, CityList} from "@/entities/City";

const AppLayoutLazy = lazy(() => import('./AppLayout.tsx'))

const ProtectedRoute = ({ children }:PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<ErrorPage/>} path='/' element={<MainLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path='/product' element={<ProductPage/>} />
    <Route path='/pricing' element={<PricingPage/>} />
    <Route path={'/login'} element={<LoginPage/>} />
    <Route path={'/app'} element={<ProtectedRoute><AppLayoutLazy/></ProtectedRoute>}>
      <Route index element={<Navigate replace to="cities" />} />
      <Route path="cities" element={<CityList />} />
      <Route path="cities/:id" element={<City />} />
      <Route path="countries" element={<CountryList />} />
      <Route path="form" element={<Form />} />
    </Route>

    <Route path='*' element={<NotFoundPage/>} />
  </Route>
))

export const App = () => {

  return (
    <Suspense fallback={<SpinnerFullPage/>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
