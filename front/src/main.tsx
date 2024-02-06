import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import React from 'react'
import './index.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route principale */}
        <Route path='/' element={<Home />} />


        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
