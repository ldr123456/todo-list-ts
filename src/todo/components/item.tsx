import React, { useState, useCallback } from 'react'
import classnames from 'classnames'

import { Input } from './input'

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../constants'

// 还是自定义两种类型
// 定义 Todo 项目的接口
interface Todo {
  id: string
  title: string
  completed: boolean
}

// 定义 Item 组件的 props 接口
// 这个React.Dispatch<any>是react本身提供的一种类型
interface ItemProps {
  todo: Todo
  dispatch: React.Dispatch<any> // 用于分发动作
  index: number
}

// 定义 Item 组件
export const Item: React.FC<ItemProps> = ({ todo, dispatch }) => {
  // 设置是否可以编辑的状态
  const [isWritable, setIsWritable] = useState(false)
  const { title, completed, id } = todo

  // 定义切换完成状态的回调函数
  const toggleItem = useCallback(
    () => dispatch({ type: TOGGLE_ITEM, payload: { id } }),
    [dispatch, id]
  )
  
  // 定义移除项目的回调函数
  const removeItem = useCallback(
    () => dispatch({ type: REMOVE_ITEM, payload: { id } }),
    [dispatch, id]
  )
  
  // 定义更新项目的回调函数
  const updateItem = useCallback(
    (newTitle: string) =>
      dispatch({ type: UPDATE_ITEM, payload: { id, title: newTitle } }),
    [dispatch, id]
  )

  // 处理双击事件的回调函数，设置为可编辑状态
  const handleDoubleClick = useCallback(() => {
    setIsWritable(true)
  }, [])

  // 处理失去焦点事件的回调函数，取消可编辑状态
  const handleBlur = useCallback(() => {
    setIsWritable(false)
  }, [])

  // 处理更新项目的回调函数
  const handleUpdate = useCallback(
    (title: string) => {
      if (title.trim().length === 0) {
        // 如果标题为空，则移除项目
        removeItem()
      } else {
        // 否则更新项目
        updateItem(title)
      }
      // 取消可编辑状态
      setIsWritable(false)
    },
    [removeItem, updateItem]
  )

  return (
    <li
      className={classnames({ completed: todo.completed })} // 设置完成状态的样式
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            placeholder="123"
            onSubmit={handleUpdate} // 提交更新
            label="Edit Todo Input"
            defaultValue={title} // 默认值为当前标题
            onBlur={handleBlur} // 失去焦点时取消编辑
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed} // 设置是否完成
              onChange={toggleItem} // 切换完成状态
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick} // 双击时设置为可编辑
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem} // 点击按钮时移除项目
            />
          </>
        )}
      </div>
    </li>
  )
}
