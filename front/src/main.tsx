import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route principale */}
        <Route path='/' />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
