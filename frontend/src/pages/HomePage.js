import React, { useEffect, useContext, useState } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from '../index'
import '../styles/home/home.css'
import Sidebar from '../components/sidebar'
import Note from '../components/note'
import { getUser } from '../http/userAPI'
import { getAllNotes } from '../http/noteAPI'
import BarLoader from "react-spinners/BarLoader"


const HomePage = observer(() => {

  const showLogs = process.env.REACT_APP_SHOW_LOGS
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const [id, setId] = useState()
  const [user_state, setUser] = useState()


  useEffect(() => {
    let userId

    if (showLogs) console.log(user.user)
    userId = user.user.id
    setId(userId)

    getUser(userId)
      .then(data => {
        user.setUser(data)
        setUser(data)
        console.log('DATA ', data)
      })
      .catch((e) => console.log(e.response.data?.message))

    getAllNotes(userId)
      .then(res => {
        setNotes(res.data)
        setLoading(false)
      })
      .catch((e) => console.log(e))

      
    
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

  if (showLogs) console.log('NOTES ARRAY LENGTH --->>>', notes.length)

  return (
    <>
      <div id="sm-container-sidebar">
        <div id="sm-sidebar">
          Lorem ipsum dolor sit amet.
          <div id="menuIcon"> </div>
        </div>
      </div>

      <div id="main-grid-container">
          <Sidebar userId={id} user={user_state}/>
          <div id="blocks-grid-container">
          {  loading ? 
            <BarLoader color = { '#837DFE' } loading = { loading } size = { 150 } />
            : notes.length ? notes.map((item) => <Note key={item.id} noteId={ item.id } blocks={item.data.blocks} time={item.data.time} />)
            : <div className='emptyMsg'>Тут пока космически пусто ...</div>
          }
          
          </div>
      </div>
    </>
  )
})

export default HomePage