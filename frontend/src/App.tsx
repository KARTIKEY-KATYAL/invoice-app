import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProductsPage from '@/pages/ProductsPage'
import InvoicePage from '@/pages/InvoicePage'
import ForgotPage from '@/pages/ForgotPage'
import ResetPage from '@/pages/ResetPage'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const user = useSelector((s: RootState) => s.auth.user)
  if(!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
  <Route path="/forgot" element={<ForgotPage />} />
  <Route path="/reset/:token" element={<ResetPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
        <Route path="/invoice" element={<PrivateRoute><InvoicePage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
  )
}

export default App
