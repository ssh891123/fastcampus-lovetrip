import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import TestPage from '@pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
