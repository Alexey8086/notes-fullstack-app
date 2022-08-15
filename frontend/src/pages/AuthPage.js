import React, { useEffect } from 'react'
import '../styles/auth/auth.css'
import Button from '../components/button'
import Form from '../components/form'
import { NOTFOUND_PG_ROUTE } from '../utils/consts'
import { useNavigate, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"

const AuthPage = observer(() => {

  const navigate = useNavigate()
  const { tab } = useParams()
  let containerClasses = (tab === 'login') ? "container" : "container right-panel-active"

  useEffect(() => {
    if ( !(tab === 'registration' || tab === 'login') ) {
      navigate(NOTFOUND_PG_ROUTE)
    } 
  }, [])

  return (
    <>
      <div className={containerClasses} id="container">
        <div className="form-container sign-up-container">
          <Form whichTab='registration'/>
        </div>
        <div className="form-container sign-in-container">
          <Form whichTab='login'/>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Добро пожаловать!</h1>
              <p>Для начала работы, пожалуйста, войдите в систему с вашей личной информацией</p>
              <Button
                class='ghost'
                id='signIn'
                text='Авторизация'
                whichTab='login'
                page='auth'
              />
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Привет!</h1>
              <p>Введите свои личные данные и начните записывать ваше космически важное вместе с нами</p>
              <Button
                class='ghost'
                id='signUp'
                text='Регистрация'
                whichTab='registration'
                page='auth'
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
})

export default AuthPage