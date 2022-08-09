import React from 'react'
import '../styles/auth/auth.css'
import Button from '../components/button'

const AuthPage = () => {
  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Регистрация</h1>
            <span>или используйте свой E-mail для регистрации</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Зарегистрироваться</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Авторизация</h1>
            <span>или используйте свой аккаунт</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Забыли пароль?</a>
            <button>Войти</button>
          </form>
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
}

export default AuthPage