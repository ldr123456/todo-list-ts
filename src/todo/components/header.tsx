import React, { useCallback } from 'react'
import { Input } from './input'

import { ADD_ITEM } from '../constants'

interface HeaderProps {
  dispatch: React.Dispatch<any> // Replace with appropriate action type if available
}

export const Header: React.FC<HeaderProps> = ({ dispatch }) => {
  const addItem = useCallback(
    (title: string) => dispatch({ type: ADD_ITEM, payload: { title } }),
    [dispatch]
  )

  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={addItem}
        label="New Todo Input"
        placeholder="What needs to be done?"
      />
    </header>
  )
}
