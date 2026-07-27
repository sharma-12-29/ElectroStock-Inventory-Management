import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/login.jsx'
import Product from './pages/product.jsx'
import Categories from './pages/categories.jsx'
import Suppliers from './pages/suppliers.jsx'
import ProtectedRoute from './pages/protectedroutes.jsx'
import ProtectedRoutes from "./components/protectedroutes.jsx";
import ForgotPassword from "./pages/forgetpassword.jsx";
import './App.css'


function App() {
  return (
    <BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/product" element={<Product/>} />
<Route path="/categories" element={
   <ProtectedRoutes role="admin">
      <Categories />
   </ProtectedRoutes>
}/>
<Route path="/suppliers" element={
   <ProtectedRoutes role="admin">
      <Suppliers />
   </ProtectedRoutes>
}/>
<Route 
 path="/forgot-password" 
 element={<ForgotPassword/>}
/>
<Route 
 path="/dashboard" 
 element={
   <ProtectedRoute>
      <Dashboard/>
   </ProtectedRoute>
 }
/>
</Routes>
  </BrowserRouter>
  )
}

export default App



