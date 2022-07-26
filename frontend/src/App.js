import React from 'react'
// const axios = require('axios').default
// import {axios} from 'axios'
import MainPage from './pages/MainPage'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function App () {

  return (
    <Routes>
      <Route exact path="/" element={<MainPage/>}/>
      <Route exact path="/home" element={<HomePage/>}/>
      <Route exact path="/settings" element={<MainPage/>}/>
      <Route exact path="/note" element={<MainPage/>}/>


    </Routes>
  )

}
