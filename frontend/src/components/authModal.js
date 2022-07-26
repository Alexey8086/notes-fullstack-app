import React, { Component } from 'react'
import '../styles/authModal.css'
const axios = require('axios').default
export default class AuthModal extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      password_is_compare: '',
      url_prefix: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hanleCloseModal = this.hanleCloseModal.bind(this)
  }

  handleInputChange (event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
    
  }

  async handleSubmit (e) {
    e.preventDefault()
    // define what is a form - login or registration
    const url_prefix = e.target.dataset.formname

    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/api/user/${url_prefix}`,
        data: { ...this.state },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })

      console.log('RESPONSE ----->', response.data.success)
    } catch (e) {
      console.log('FROM hadleSubmit ----->', e)
    }

    // e.preventDefault()
  }

  hanleCloseModal (event) {
    event.target.parentNode.style.display = 'none'
    
    const offsetModalBlock = document.querySelectorAll(`.${this.props.offsetModalClassName}`)[0]

    offsetModalBlock.style.top = '-100vh'
    offsetModalBlock.style.display = 'none'
  }

  render () {

    if (this.props.isSignIn) {
      return (
        <div>
    
          <div className='dark-modal-bg'></div>
      
          <div className='modal-container'>
            <div onClick={this.hanleCloseModal} id='closeModalSign'>x</div>
            <h1>РЕГИСТРАЦИЯ</h1>

            <form id='sign-in-form' data-formname='login' onSubmit={this.handleSubmit}>
              <label>E-MAIL</label>
              <input name='email' type="email" value={this.state.value} onChange={this.handleInputChange} />
              
              <label>ВВЕДИТЕ ПАРОЛЬ:</label>
              <input name='password' type="password" value={this.state.value} onChange={this.handleInputChange} />
      
              <button className='signupBtn' type="submit">Войти</button>
            </form>
          </div>
    
        </div>
      )
    } else {
      return (
        <div>
    
        <div className='dark-modal-bg'></div>
    
        <div className='modal-container'>
          <div onClick={this.hanleCloseModal} id='closeModalSign'>x</div>
          <h1>РЕГИСТРАЦИЯ</h1>
          <form id='sign-in-form' data-formname='registration' onSubmit={this.handleSubmit}>
            <label>ВАШЕ ИМЯ:</label>
            <input name='name' type="text" value={this.state.name} onChange={this.handleInputChange} />
            
            <label>E-MAIL</label>
            <input name='email' type="email" value={this.state.email} onChange={this.handleInputChange} />
            
            <label>ПРИДУМАЙТЕ ПАРОЛЬ:</label>
            <input name='password' type="password" value={this.state.password} onChange={this.handleInputChange} />
            
    
            <label>ВВЕДИТЕ ПАРОЛЬ ЕЩЁ РАЗ:</label>
            <input name='password_is_compare' type="password" value={this.state.password_is_compare} onChange={this.handleInputChange} />
    
            <button className='signupBtn' type="submit">Зарегистрироваться</button>
          </form>
        </div>
    
        </div>
      )
    }


  }
}
