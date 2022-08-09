import React, { useContext } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { NOTFOUND_PG_ROUTE } from '../utils/consts'
import { Context } from '../index'

const AppRouter = () => {
  const { user } = useContext(Context)

  console.log(user)
  return (
    <Routes>
      { user.isAuth &&
        privateRoutes.map (
          ( {path, Component} ) => 
            <Route 
              key={path}
              path={path}
              element={<Component />}
              exact
            />
        )
      }

      { publicRoutes.map (
          ( {path, Component} ) => 
            <Route 
              key={path}
              path={path}
              element={<Component />}
              exact
            />
        )
      }

      <Route path="*" element={<Navigate replace to={NOTFOUND_PG_ROUTE} />} />

    </Routes>
  )
}

export default AppRouter