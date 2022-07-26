import React, { Component } from 'react'
import '../styles/mainPage.css'
import astronautImage from '../icons/Astronaut.png'
import Button from '../components/button'
import AuthModal from '../components/authModal'

export default class MainPage extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      isSignIn: null
    }

    this.isSignInHandler = this.isSignInHandler.bind(this)
  }

  isSignInHandler (isSignIn) {
    this.setState({isSignIn})
  }

  render () {
 
    return (
      <div>
        <div id='ctm-container'>
          <div id='welcome-title'>
            <p>Записывайте ваше космически</p>
            <p>важное вместе с Simple notes</p>
          </div>
    
          <div id='btns-container'>
            <Button 
              modalClassName='modal-container'
              offsetModalClassName='dark-modal-bg'
              class='sign-up-btn'
              text='Зарегистрироваться'
              isSignIn={false}
              isSignInHandlerProperty={this.isSignInHandler}
            />
              &nbsp;&nbsp;&nbsp;
            <Button 
              modalClassName='modal-container'
              offsetModalClassName='dark-modal-bg'
              class='sign-in-btn'
              text='Войти'
              isSignIn={true}
              isSignInHandlerProperty={this.isSignInHandler}
            />
          </div>
        </div>
  
        <div id="cursor"></div>
  
        <div id="astronaut-icon">
          <img width="442px" height="345px" src={astronautImage} alt="Через терний к звёздам!" />
        </div>
  
        <AuthModal isSignIn={this.state.isSignIn} offsetModalClassName='dark-modal-bg'/>
      </div>
    )
  }

}