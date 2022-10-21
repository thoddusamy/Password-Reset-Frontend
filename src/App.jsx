import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import ResetFormPage from './Components/ResetFormPage/ResetFormPage'
import GetEmailPage from './Components/GetEmailPage/GetEmailPage'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/step1' element={<GetEmailPage />} />
          <Route path='/passwordresetform/:email/:string' element={<ResetFormPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
