import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NoteStore from './store/NoteStore'
import UserStore from './store/UserStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))

// Initial render
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    note: new NoteStore()
  }}>
    <App />
  </Context.Provider>
)
