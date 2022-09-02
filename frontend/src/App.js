import React, { useContext, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userAPI'
import BarLoader from "react-spinners/BarLoader"

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [marker, setMarker] = useState()

  setInterval(() => {
    setMarker('')
  }, 1000)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      //console.log('From app ####', data)
    }).finally( () => setLoading(false) )
  
  }, [marker])

  if (loading) {
    return <BarLoader color = { '#837DFE' } loading = { loading } size = { 150 } />
  }

  return (

    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>

  )
})

export default App