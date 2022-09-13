import React, { useEffect, useState, useContext, useRef} from 'react'
import { Context } from '../index'
import { useNavigate, useParams} from "react-router-dom"
import { SETTINGS_PG_ROUTE, NOTE_PG_ROUTE, AUTH_PG_ROUTE } from '../utils/consts'
import config from '../config'

import { observer } from 'mobx-react-lite'

import Logo from '../imgs/Logo-DARK.svg'
import AddIcon from '../imgs/Add-new-notes-DARK.svg'
import ThemeIcon from '../imgs/Theme-DARK.svg'
import SettingsIcon from '../imgs/Settings-DARK.svg'
import LogoutIcon from '../imgs/Logout-DARK.svg'

const theme = localStorage.getItem('theme')


const Sidebar = observer((props) => {

  const { user } = useContext(Context)

  const theme = localStorage.getItem('theme')
  const setTheme = user.setTheme

  const $logo_icon_ref = useRef(null)
  const $plus_icon_ref = useRef(null)
  const $change_theme_icon_ref = useRef(null)
  const $settings_icon_ref = useRef(null)
  const $quit_icon_ref = useRef(null)

  useEffect(() => {
    if (theme === '"dark"') {
      $logo_icon_ref.current.style.backgroundColor = '#F5F5F5'
      $plus_icon_ref.current.style.backgroundColor = '#F5F5F5'
      $change_theme_icon_ref.current.style.backgroundColor = '#F5F5F5'
      $settings_icon_ref.current.style.backgroundColor = '#F5F5F5'
      $quit_icon_ref.current.style.backgroundColor = '#F5F5F5'
    } else {
      $logo_icon_ref.current.style.backgroundColor = 'transparent'
      $plus_icon_ref.current.style.backgroundColor = 'transparent'
      $change_theme_icon_ref.current.style.backgroundColor = 'transparent'
      $settings_icon_ref.current.style.backgroundColor = 'transparent'
      $quit_icon_ref.current.style.backgroundColor = 'transparent'
    }

  }, [theme])

  // при перезагрузки страницы mobX state обнуляется и user.data становится не валидной
  // но потом за счёт setInterval рендера state заполняется снова
  // это занимает очень мало времени, но его хватает для появления ошибки, поэтому нужна проверка ? чтобы приложение не падало
  let avatar = props.user?.data.user.avatar
  let name = props.user?.data.user.name

  const navigate = useNavigate()
  
  const isAvatarMine = (url) => {
    if (url?.indexOf('https://avatars.dicebear.com') == -1) {
      return true
    } else {
      return false
    }
  }

  const onClickHandler = (page) => {
    page === 'settings' ? navigate(`${SETTINGS_PG_ROUTE}/${props.user?.data.user._id}`)
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

        <img ref={$logo_icon_ref} id='logo' src={Logo} />
        <div className="title-text">Simple Notes</div>

        <hr id="dividens" />

        <div id="avatar-icon" style={ avatarStyle }></div>
        <div id="avatar-name">{ name }</div>
        
        <img ref={$plus_icon_ref} id="add-new-notes-icon" src={AddIcon} />
        <div onClick={() => onClickHandler('note')} className="items-backlight" id="caption-add-new-notes">Создать новую заметку</div>

        <img ref={$change_theme_icon_ref} id="ch-theme-icon" src={ThemeIcon} />
        <div onClick={ () => changeThemeHandler(setTheme, theme) } className="items-backlight" id="caption-ch-theme">Сменить тему</div>

        <img ref={$settings_icon_ref} id="settings-icon" src={SettingsIcon} />
        <div onClick={() => onClickHandler('settings')} className="items-backlight" id="caption-settings">Настройки</div>

        <img ref={$quit_icon_ref} id="logout-icon" src={LogoutIcon} />
        <div onClick={logoutHandler} className="items-backlight" id="caption-logout">Выйти</div>
      </aside>
    </div>

  )

})

export default Sidebar