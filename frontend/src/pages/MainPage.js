import React from 'react'
import '../styles/main/main.css'
import astronautLight from '../imgs/Astronaut-light.svg'
import astronautDark from '../imgs/Astronaut-dark.svg'
import Button from '../components/button'

const MainPage = () => {

  const theme = localStorage.getItem('theme')
  const icon = theme == '"dark"' ? astronautLight : astronautDark

  return (
    <>
    <div id='ctm-container'>

      <div id='welcome-title'>
        <p>Записывайте ваше космически</p>
        <p>важное вместе с Simple notes</p>
      </div>

      <div id='btns-container'>
        <Button
          class='sign-up-btn'
          text='Зарегистрироваться'
          whichTab='registration'
          page='main'
        />
          &nbsp;&nbsp;&nbsp;
        <Button 
          class='sign-in-btn'
          text='Войти'
          whichTab='login'
          page='main'
        />
      </div>
    </div>

    <div id="cursor"></div>

    <div id="astronaut-icon">
      <img width="442px" height="345px" src={icon} alt="Через терний к звёздам!" />

    </div>

    </>
  )
}

export default MainPage