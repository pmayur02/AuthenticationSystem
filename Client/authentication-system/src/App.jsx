import './App.css'
import Home from './Compoents/Home/Home'
import Login from './Compoents/Login/Login'
import Register from './Compoents/Register/Register'
import ResetPassword from './Compoents/ResetPassword/ResetPassword'
import VerifyOtp from './Compoents/VerifyOtp/VerifyOtp';
import { ToastContainer} from 'react-toastify';

import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
