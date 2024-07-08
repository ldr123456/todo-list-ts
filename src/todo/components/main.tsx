import React, { useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { Item } from './item'
import classnames from 'classnames'

import { TOGGLE_ALL } from '../constants'

// 定义 Todo 项目的接口
interface Todo {
  id: string
  title: string
  completed: boolean
}

// 定义 Main 组件的 props 接口
interface MainProps {
  todos: Todo[]
  dispatch: React.Dispatch<any> // 用于分发动作
}

// 定义 Main 组件
export const Main: React.FC<MainProps> = ({ todos, dispatch }) => {
  const { pathname: route } = useLocation() // 获取当前路由路径

  // 使用 useMemo 钩子来计算当前可见的 todos 列表
  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (route === '/active') return !todo.completed // 如果路由是 /active，则显示未完成的 todos
        if (route === '/completed') return todo.completed // 如果路由是 /completed，则显示已完成的 todos
        return todo // 否则显示所有 todos
      }),
    [todos, route] // 当 todos 或 route 改变时重新计算
  )

  // 使用 useCallback 钩子定义切换所有 todos 状态的回调函数
  const toggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), // 分发 TOGGLE_ALL 动作，切换所有 todos 的完成状态
    [dispatch]
  )

  return (
    <main className="main" data-testid="main">
      {visibleTodos.length > 0 && ( // 如果有可见的 todos，显示切换所有的复选框
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            data-testid="toggle-all"
            checked={visibleTodos.every((todo) => todo.completed)} // 检查所有可见的 todos 是否都已完成
            onChange={toggleAll} // 当复选框状态改变时调用 toggleAll 回调函数
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      )}
      <ul className={classnames('todo-list')} data-testid="todo-list">
        {visibleTodos.map((todo, index) => (
          <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} /> // 渲染每个可见的 todo 项目
        ))}
      </ul>
    </main>
  )
}
