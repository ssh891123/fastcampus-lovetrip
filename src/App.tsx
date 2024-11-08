import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import MyPage from '@pages/My'
import SigninPage from '@pages/Signin'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'
import ReservationPage from '@pages/Reservation'
import SchedulePage from '@pages/Schedule'
import ReservationDonePage from '@pages/ReservationDone'
import ReservationListPage from '@pages/ReservationList'

import PrivateRouter from '@components/auth/PrivateRouter'
import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
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
  )
}

export default App
