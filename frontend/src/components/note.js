import React, { useEffect } from 'react'
import { useNavigate, useParams, useRouteMatch } from 'react-router-dom'
import { SETTINGS_PG_ROUTE, NOTE_PG_ROUTE } from '../utils/consts'
import '../styles/note/note.css'

import logo from '../imgs/Logo.png'
import addNewNote from '../imgs/Add new notes.png'
import theme from '../imgs/Theme.png'
import settings from '../imgs/Settings.png'
import logout from '../imgs/Logout.png'


const Note = (props) => {

  const navigate = useNavigate()
  
  const onClickHandler = () => {
    navigate(NOTE_PG_ROUTE)
  }

  const data = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, quo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis hic amet labore fugit culpa, totam debitis pariatur illo. Iste fuga quia mollitia recusandae voluptate totam, tempora sint, minus facere accusamus nisi eius, voluptatem incidunt enim beatae voluptatibus possimus! Sunt totam blanditiis modi aut quos sit odit voluptatibus deserunt enim temporibus?'

  return (

    <div onClick={onClickHandler} className='item'>
    <div className='item__title'>Something</div>
    <div className='item__text'>
      <textarea disabled value={data} />
    </div>
    <div className='item__date'>25-01-2001, 14:06</div>
  </div>

  )

}

export default Note