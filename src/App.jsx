// import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='*' element={<h1>Page not found</h1>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
