import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
    </Routes>
    </>
  )
}

export default App
