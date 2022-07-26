import React from 'react'

const Button = (props) => {
  
  const functionsContainer = (props) => {
    props.isSignInHandlerProperty(props.isSignIn)
    showModalHandler(props.modalClassName, props.offsetModalClassName)
  }

  const showModalHandler = (modalClassName, offsetModalClassName) => {
    document.getElementsByClassName(modalClassName)[0].style.display = 'block'
    const offsetModalBlock = document.getElementsByClassName(offsetModalClassName)[0]
  
    offsetModalBlock.style.top = 0
    offsetModalBlock.style.display = 'block'
  }



  return (
    <button
      onClick = { () => functionsContainer(props) }
      className = {props.class}
    >
      {props.text}
    </button>
  )

}

export default Button