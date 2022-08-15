import React, { useEffect, useContext, useState } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from '../index'
import '../styles/home/home.css'
import Sidebar from '../components/sidebar'
import Note from '../components/note'
import { getUser } from '../http/userAPI'


const HomePage = observer(() => {

  const { user } = useContext(Context)

  useEffect(() => {
    getUser(user.user.id).then(data => user.setUser(data))
    
   }, [])

  useEffect(() => {
    // componentWillMount
    const root = document.getElementById('root')
    root.classList.add('home-root-container')
    

    return () => {
      // componentWillUnmount
      root.classList.remove('home-root-container')
    }
   }, [])

  // console.log(userData)


  return (
    <>
      <div id="sm-container-sidebar">
        <div id="sm-sidebar">
          Lorem ipsum dolor sit amet.
          <div id="menuIcon"> </div>
        </div>
      </div>

      <div id="main-grid-container">
          <Sidebar />
          <div id="blocks-grid-container">
          <Note />
          </div>
      </div>
    </>
  )
})

export default HomePage