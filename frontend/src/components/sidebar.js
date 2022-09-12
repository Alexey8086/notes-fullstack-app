import React, { useEffect, useState, useContext} from 'react'
import { Context } from '../index'
import { useNavigate, useParams } from "react-router-dom"
import { SETTINGS_PG_ROUTE, NOTE_PG_ROUTE, AUTH_PG_ROUTE } from '../utils/consts'

import logoDARK from '../imgs/Logo-DARK.svg'
import addNewNoteDARK from '../imgs/Add-new-notes-DARK.svg'
import themeIconDARK from '../imgs/Theme-DARK.svg'
import settingsDARK from '../imgs/Settings-DARK.svg'
import logoutDARK from '../imgs/Logout-DARK.svg'

import logoLIGHT from '../imgs/Logo-LIGHT.svg'
import addNewNoteLIGHT from '../imgs/Add-new-notes-LIGHT.svg'
import themeIconLIGHT from '../imgs/Theme-LIGHT.svg'
import settingsLIGHT from '../imgs/Settings-LIGHT.svg'
import logoutLIGHT from '../imgs/Logout-LIGHT.svg'

import config from '@/../../frontend-config'

import { observer } from 'mobx-react-lite'

const theme = localStorage.getItem('theme')
const icon1 = theme == '"dark"' ? logoLIGHT : logoDARK
const icon2 = theme == '"dark"' ? addNewNoteLIGHT : addNewNoteDARK
const icon3 = theme == '"dark"' ? themeIconLIGHT : themeIconDARK
const icon4 = theme == '"dark"' ? settingsLIGHT : settingsDARK
const icon5 = theme == '"dark"' ? logoutLIGHT : logoutDARK


const Sidebar = observer((props) => {

  const { user } = useContext(Context)

  // при перезагрузки страницы mobX state обнуляется и user.data становится не валидной
  // но потом за счёт setInterval рендера state заполняется снова
  // это занимает очень мало времени, но его хватает для появления ошибки, поэтому нужна проверка ? чтобы приложение не падало
  let avatar = props.user?.data.user.avatar
  let name = props.user?.data.user.name
  const theme = localStorage.getItem('theme')

  const setTheme = user.setTheme

  const navigate = useNavigate()
  
  const isAvatarMine = (url) => {
    if (url?.indexOf('https://avatars.dicebear.com') == -1) {
      return true
    } else {
      return false
    }
  }

  const onClickHandler = (page) => {
    page === 'settings' ? navigate(`${SETTINGS_PG_ROUTE}/${props.userId}`)
    : page === 'note' ? navigate(NOTE_PG_ROUTE)
    : console.log('Smt went wrong in onClickHandler')
  }

  const changeThemeHandler = (stateHandler, theme) => {


    if (theme == '"dark"') {
      stateHandler('light')
    } else {
      stateHandler('dark')
    }
  }

  const logoutHandler = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate(`${AUTH_PG_ROUTE}/login`)
  }

  const avatarStyle = isAvatarMine(avatar) ?
    { backgroundImage: `url(${config.baseUrl}${avatar})` }
  : { backgroundImage: `url(${avatar})` }

  return (

    <div id="container-sidebar">
      <aside id="sidebar">
        <img id="logo" width="54" height="56" src={icon1} alt="логотип" />
        <div className="title-text">Simple Notes</div>

        <hr id="dividens" />

        <div id="avatar-icon" style={ avatarStyle }></div>
        <div id="avatar-name">{ name }</div>

        <img id="add-new-notes-icon" width="54" height="56" src={icon2} alt="Добавть заметку" />
        <div onClick={() => onClickHandler('note')} className="items-backlight" id="caption-add-new-notes">Создать новую заметку</div>

        <img id="ch-theme-icon" width="54" height="56" src={icon3} alt="Сменить тему" />
        <div onClick={ () => changeThemeHandler(setTheme, theme) } className="items-backlight" id="caption-ch-theme">Сменить тему</div>

        <img id="settings-icon" width="54" height="56" src={icon4} alt="Настройки" />
        <div onClick={() => onClickHandler('settings')} className="items-backlight" id="caption-settings">Настройки</div>

        <img id="logout-icon" width="54" height="56" src={icon5} alt="Выйти" />
        <div onClick={logoutHandler} className="items-backlight" id="caption-logout">Выйти</div>
      </aside>
  </div>

  )

})

export default Sidebar