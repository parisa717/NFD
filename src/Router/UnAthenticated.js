import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'

const UnAthenticated = () => {
  return (
    <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Register />} />
         
        </Routes>
    </div>
  )
}

export default UnAthenticated