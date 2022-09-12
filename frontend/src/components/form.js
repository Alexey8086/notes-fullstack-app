import React, { useEffect, useContext, useState } from 'react'
import { observer } from "mobx-react-lite"
import { useNavigate, useParams, useRouteMatch } from "react-router-dom"
import { HOME_PG_ROUTE } from '../utils/consts'
import { Context } from '../index'
import { registration, login } from '../http/userAPI'


const Form = observer((props) => {

  const {user} = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [authError, setError] = useState(null)

  const errorMsgStyles = {
    color: 'orange'
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  const authHandler = async (isLogin) => {
    try {
      let res
      if (isLogin) {
        res = await login(email, password)
        user.setUser(res)
        user.setIsAuth(true)
        navigate(HOME_PG_ROUTE)
      } else {
        res = await registration(email, password, name)
        user.setUser(res)
        user.setIsAuth(true)
        navigate(HOME_PG_ROUTE)
      }
      
      // user.setUser(res)
      // user.setIsAuth(true)
    } catch (e) {
      setError(e.response?.data?.message)
    }
  }

  return (
    <>
      { (props.whichTab == 'registration') ?
        <form onSubmit={onSubmit}>
            <h1>Регистрация</h1>
            <span>или используйте свой E-mail для регистрации</span>
            { authError ? <h3 style={ errorMsgStyles }> { authError } </h3> : null } 
            <input value={ name } onChange={ e => setName(e.target.value) } name='name' type="text" placeholder="Name" />
            <input value={ email } onChange={ e => setEmail(e.target.value) } name='email' type="email" placeholder="Email" />
            <input value={ password } onChange={ e => setPassword(e.target.value) } name='password' type="password" placeholder="Password" />
            <button onClick={ () => authHandler(false) }>Зарегистрироваться</button>
        </form>
        :
        <form onSubmit={onSubmit}>
          <h1>Авторизация</h1>
          <span>или используйте свой аккаунт</span>
          { authError ? <h3 style={ errorMsgStyles }> { authError } </h3> : null }
          <input value={ email } onChange={ e => setEmail(e.target.value) } name='email' type="email" placeholder="Email" />
          <input value={ password } onChange={ e => setPassword(e.target.value) } name='password' type="password" placeholder="Password" />
          <a href="#">Забыли пароль?</a>
          <button onClick={ () => authHandler(true) }>Войти</button>
      </form>
      }
    </>

  )

})

export default Form