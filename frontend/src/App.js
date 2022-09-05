import React, { useContext, useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userAPI'
import BarLoader from "react-spinners/BarLoader"
import './styles/index.css'

// определяем тему, установленную в настройках браузера
const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const App = observer(() => {
  const { user } = useContext(Context)
  // заносим тему в начальное состояние (состояние по умолчанию)
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')
  const [loading, setLoading] = useState(true)
  const [marker, setMarker] = useState()

  //  передаём в контекст приложения функцию состояния темы
  // (чтобы иметь доступ к управлению состоянием темы из любого места приложения)
  user.setSetTheme(setTheme)

  setInterval(() => {
    setMarker('')
  }, 1000)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally( () => setLoading(false) )
  
  }, [marker])

  if (loading) {
    return <BarLoader color = { '#837DFE' } loading = { loading } size = { 150 } />
  }

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  )
})

export default App