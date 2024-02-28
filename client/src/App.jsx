import { useState, useContext } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './component/Home'
import AllGoals from './component/AllGoals'
import AddGoal from './component/AddGoal'
import Navbar from './component/Navbar'
import AuthForm from './component/AuthForm'
import { UserContext } from './context/UserContext'

function App() {

  const {token} = useContext(UserContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element= {token ? <Navigate to = "/home"/> : <AuthForm />} />
        <Route path = "/home" element= {!token ? <Navigate to = "/" /> : <Home />} />
        <Route path='/add-goal' element= {!token ? <Navigate to = "/" /> : <AddGoal /> }/>
        <Route path='/all-goals' element={!token ? <Navigate to = "/" /> : <AllGoals />} />
      </Routes>
    </>
  )
}

export default App
