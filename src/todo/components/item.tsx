import React, { useState, useCallback } from 'react'
import classnames from 'classnames'

import { Input } from './input'

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../constants'

interface Todo {
  id: string
  title: string
  completed: boolean
}

interface ItemProps {
  todo: Todo
  dispatch: React.Dispatch<any> 
  index: number
}

export const Item: React.FC<ItemProps> = ({ todo, dispatch }) => {
  const [isWritable, setIsWritable] = useState(false)
  const { title, completed, id } = todo

  const toggleItem = useCallback(
    () => dispatch({ type: TOGGLE_ITEM, payload: { id } }),
    [dispatch, id]
  )
  const removeItem = useCallback(
    () => dispatch({ type: REMOVE_ITEM, payload: { id } }),
    [dispatch, id]
  )
  const updateItem = useCallback(
    (newTitle: string) =>
      dispatch({ type: UPDATE_ITEM, payload: { id, title: newTitle } }),
    [dispatch, id]
  )

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsWritable(false)
  }, [])

  const handleUpdate = useCallback(
    (title: string) => {
      if (title.trim().length === 0) {
        removeItem()
      } else {
        updateItem(title)
      }
      setIsWritable(false)
    },
    [removeItem, updateItem]
  )

  return (
    <li
      className={classnames({ completed: todo.completed })}
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            placeholder="123"
            onSubmit={handleUpdate}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem}
            />
          </>
        )}
      </div>
    </li>
  )
}
