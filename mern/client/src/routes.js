import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { LinksPage } from './pages/LinksPage'

export const useRoutes = (isAunthentificated) => {
  if (isAunthentificated) {
    return (
      <Routes>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        {/* <Navigate to="/create" replace={true} /> */}
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {/* <Navigate to="/" replace={true} /> */}
    </Routes>
  )
}
