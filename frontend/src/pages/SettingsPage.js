import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import backArrow from  '../imgs/back.png'
import '../styles/settings/settings.css'
import { HOME_PG_ROUTE } from '../utils/consts'
import { getUser, updateSettings, handleImage } from '../http/userAPI'

import config from '../config'


const SettingsPage = () => {

  const { id } = useParams()
  const [url, setUrl] = useState()
  const [userName, setName] = useState()
  const inputFileRef = useRef(null)
  const inputNameRef = useRef(null)

  const navigate = useNavigate()

  const isAvatarMine = (url) => {
    if (url?.indexOf('https://avatars.dicebear.com') === -1) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {

    getUser()
      .then(data => {
        if (data.data.user.avatar) setUrl(data.data.user.avatar)
        setName(data.data.user.name)
      })
      .catch((e) => console.log(e.response.data?.message))
    
   }, [])

  const fileSelectedHandler = async (e) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await handleImage(formData)
      setUrl(data.url)
    } catch (err) {
      console.warn(err)
    }
  }

  const uploadHandler = async (userId, avatarUrl, name) => {
    try {
      await updateSettings(userId, avatarUrl, name)
      navigate(HOME_PG_ROUTE)
    } catch (err) {
      console.warn(err)
    }
  }

  const nameInputHandler = (e) => {
    if (e.target.value.length < 26)
    setName(e.target.value)
  }

  const style = isAvatarMine() ?
    { backgroundImage: `url(${config.baseUrl}${url})` }
  : { backgroundImage: `url(${url})` }

  return (

    <div id={"settings-pg-container"}>
      <img id="back_link_img" width="50" height="50" src={ backArrow } alt="" />
      <div id="back-link-wrapper">
        <Link to={ HOME_PG_ROUTE }>Вернуться назад</Link>
      </div>

      <div style = { style } id="profile-image" />

      <input
        type = "file" name = "avatar"
        ref = { inputFileRef }
        onChange = { fileSelectedHandler }
        hidden
      />

      <button 
        className = 'download-img-field'
        onClick = { () => inputFileRef.current.click() }
      >
        Загрузить изоражение
      </button>

      <div id="username-caption">
        <input ref = { inputNameRef } onChange = { nameInputHandler } value = { userName } type="text" name="username" id="username-input-field" disabled />
        <p onClick = {() => { inputNameRef.current.disabled = false }} id="change-name">Изменить имя</p>
      </div>

      <button onClick = { () => { uploadHandler(id, url, userName) } } id="save-changes-btn" type="submit">Сохранить изменения</button>
    </div>

  )
}

export default SettingsPage