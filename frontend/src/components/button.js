import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { AUTH_PG_ROUTE } from "../utils/consts"


const Button = (props) => {
  
  const navigate = useNavigate()
  let { tab } = useParams()

  const openAuthTab = (props) => {
    if (props.whichTab === 'login') {
      navigate(`${AUTH_PG_ROUTE}/login`)
    } else if (props.whichTab === 'registration') {
      navigate(`${AUTH_PG_ROUTE}/registration`)
    }
  }

  useEffect(() => {
    if (props.page === 'auth') {
      
      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');
      
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active')
        if (tab == 'login') navigate(`${AUTH_PG_ROUTE}/registration`)
      }
      )
      
      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active')
        if (tab == 'registration') navigate(`${AUTH_PG_ROUTE}/login`)
      })
    }
  }, [])

  

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