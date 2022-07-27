import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import '../styles/authModal.css'
const axios = require('axios').default


const AuthModal = (props) =>  {

  const navigate = useNavigate()
  const isLogin = props.isSignIn
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setUserName] = useState('')
  const [password_is_compare, setPasswordIsCompare] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // define what is a form - login or registration
    const url_prefix = e.target.dataset.formname
    const data = (url_prefix === 'registration') ?  { name, email, password, password_is_compare} : {email, password}

    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/api/user/${url_prefix}`,
        data: data,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })

      if (response.data.message) setErrorMsg({errorMsg: response.data.message})
      console.log('RESPONSE ----->', response.data.success)
      if (url_prefix === 'login') navigate(`/home`)
    } catch (e) {
      console.log('FROM hadleSubmit ----->', e)
    }

    // e.preventDefault()
  }

  const hanleCloseModal = (event) => {
    event.target.parentNode.style.display = 'none'
    
    const offsetModalBlock = document.querySelectorAll(`.${props.offsetModalClassName}`)[0]

    offsetModalBlock.style.top = '-100vh'
    offsetModalBlock.style.display = 'none'
  }

 
  return (
    <div>

      <div className='dark-modal-bg'></div>
  
      <div className='modal-container'>
        <div onClick={hanleCloseModal} id='closeModalSign'>x</div>

        {isLogin ? 
          <React.Fragment>
            <h1>ВХОД В АККАУНТ</h1>
            {errorMsg ? <p style={{color: 'red'}}> {errorMsg} </p> : <p></p>}
            <form id='sign-in-form' data-formname='login' onSubmit={handleSubmit}>
              <label>E-MAIL</label>
              <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
              
              <label>ВВЕДИТЕ ПАРОЛЬ:</label>
              <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
            
              <button className='signupBtn' type="submit">Войти</button>
            </form>
          </React.Fragment>
          :
          <React.Fragment>
            <h1>РЕГИСТРАЦИЯ</h1>
            <form id='sign-in-form' data-formname='registration' onSubmit={handleSubmit}>
              <label>ВАШЕ ИМЯ:</label>
              <input name='name' type="text" value={name} onChange={e => setUserName(e.target.value)} />
              
              <label>E-MAIL</label>
              <input name='email' type="email" value={email} onChange={e => setEmail(e.target.value)} />
              
              <label>ПРИДУМАЙТЕ ПАРОЛЬ:</label>
              <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
              
      
              <label>ВВЕДИТЕ ПАРОЛЬ ЕЩЁ РАЗ:</label>
              <input name='password_is_compare' type="password" value={password_is_compare} onChange={e => setPasswordIsCompare(e.target.value)} />
      
              <button className='signupBtn' type="submit">Зарегистрироваться</button>
            </form>
          </React.Fragment>
        }

      </div>

    </div>
  )
}

export default AuthModal