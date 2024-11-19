import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import useLoadKakao from '@hooks/useLoadKakao'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'

const HotelList = lazy(() => import('@pages/HotelList'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const MyPage = lazy(() => import('@pages/My'))
const LikePage = lazy(() => import('@pages/settings/like'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const SettingsPage = lazy(() => import('@pages/settings'))
const SigninPage = lazy(() => import('@pages/Signin'))
const TestPage = lazy(() => import('@pages/Test'))
const PrivateRouter = lazy(() => import('@components/auth/PrivateRouter'))

function App() {
  useLoadKakao()

  return (
    <Suspense fallback={<></>}>
      <HelmetProvider>
        <BrowserRouter>
          <AuthGuard>
            <Navbar />
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route
                path="/my"
                element={
                  <PrivateRouter>
                    <MyPage />
                  </PrivateRouter>
                }
              />
              <Route path="/signin" element={<SigninPage />} />
              <Route
                path="/settings"
                element={
                  <PrivateRouter>
                    <SettingsPage />
                  </PrivateRouter>
                }
              />
              <Route
                path="/settings/like"
                element={
                  <PrivateRouter>
                    <LikePage />
                  </PrivateRouter>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRouter>
                    <SchedulePage />
                  </PrivateRouter>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRouter>
                    <ReservationPage />
                  </PrivateRouter>
                }
              />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRouter>
                    <ReservationDonePage />
                  </PrivateRouter>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRouter>
                    <ReservationListPage />
                  </PrivateRouter>
                }
              />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  )
}

export default App
