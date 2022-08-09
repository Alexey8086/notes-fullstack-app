import React from 'react'
import '../styles/main/main.css'
import astronautImage from '../imgs/Astronaut.png'
import Button from '../components/button'

const MainPage = () => {
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
      <img width="442px" height="345px" src={astronautImage} alt="Через терний к звёздам!" />
    </div>

    </>
  )
}

export default MainPage