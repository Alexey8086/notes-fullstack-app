import React, { useEffect, useContext } from 'react'
import { useNavigate, useParams, useRouteMatch } from "react-router-dom"
import { SETTINGS_PG_ROUTE, NOTE_PG_ROUTE, AUTH_PG_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

import logo from '../imgs/Logo.png'
import addNewNote from '../imgs/Add new notes.png'
import theme from '../imgs/Theme.png'
import settings from '../imgs/Settings.png'
import logout from '../imgs/Logout.png'


const Sidebar = observer(() => {

  const { user } = useContext(Context)
  const { name } = user.user.data.user
  const navigate = useNavigate()
  


  // useEffect(() => {
  //   componentWillMount


  //   return () => {
  //     componentWillUnmount
  //   }
  //  }, [])
  
  const onClickHandler = (page) => {
    page === 'settings' ? navigate(SETTINGS_PG_ROUTE)
    : page === 'note' ? navigate(NOTE_PG_ROUTE)
    : console.log('Smt went wrong in onClickHandler')
  }

  const changeThemeHandler = () => {
    console.log('Changing Theme ................')
  }

  const logoutHandler = () => {
    // user.setUser({})
    // user.setIsAuth(false)
    // navigate(AUTH_PG_ROUTE)
  }

  return (

    <div id="container-sidebar">
      <aside id="sidebar">
        <img id="logo" width="54" height="56" src={logo} alt="логотип" />
        <div className="title-text">Simple Notes</div>

        <hr id="dividens" />

        <div id="avatar-icon"></div>
        <div id="avatar-name">{ name }</div>

        <img id="add-new-notes-icon" width="54" height="56" src={addNewNote} alt="Добавть заметку" />
        <div onClick={() => onClickHandler('note')} className="items-backlight" id="caption-add-new-notes">Создать новую заметку</div>

        <img id="ch-theme-icon" width="54" height="56" src={theme} alt="Сменить тему" />
        <div onClick={changeThemeHandler} className="items-backlight" id="caption-ch-theme">Сменить тему</div>

        <img id="settings-icon" width="54" height="56" src={settings} alt="Настройки" />
        <div onClick={() => onClickHandler('settings')} className="items-backlight" id="caption-settings">Настройки</div>

        <img id="logout-icon" width="54" height="56" src={logout} alt="Выйти" />
        <div onClick={logoutHandler} className="items-backlight" id="caption-logout">Выйти</div>
      </aside>
  </div>

  )

})

export default Sidebar