import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'
import MyPage from '@pages/My'
import SigninPage from '@pages/Signin'

import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
