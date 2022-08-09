import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { AUTH_PG_ROUTE } from "../utils/consts"


const Button = (props) => {
  
  const navigate = useNavigate()

  const openAuthTab = (props) => {


    if (props.whichTab === 'login') {
      navigate(AUTH_PG_ROUTE)
    } else if (props.whichTab === 'registration') {
      navigate(AUTH_PG_ROUTE)
    }
  }

  useEffect(() => {
    if (props.page === 'auth') {
      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');
      
      signUpButton.addEventListener('click', () =>
      container.classList.add('right-panel-active'));
      
      signInButton.addEventListener('click', () =>
      container.classList.remove('right-panel-active'));
    }
  })

  

  return (

    (props.page === 'main') ?
    
    <button
      onClick = { () => openAuthTab(props) }
      className = {props.class}
    >
      {props.text}
    </button>

    : (props.page === 'auth') ?

    <button
      className = {props.class}
      id = {props.id}
    >
      {props.text}
    </button>

    : <h1>Упс, произошло что-то нехорошее ...</h1>
  )

}

export default Button