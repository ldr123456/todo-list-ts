import React, { useReducer } from 'react'
import { Header } from './components/header'
import { Main } from './components/main'
import { Footer } from './components/footer'

import { todoReducer } from './reducer'

import './app.css'

export const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, [])

  return (
    <>
      <Header dispatch={dispatch} />
      <Main todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </>
  )
}
