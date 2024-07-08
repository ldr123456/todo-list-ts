import React, { useCallback, useMemo } from 'react' // 引入 React 和一些钩子函数
import { useLocation } from 'react-router-dom' // 引入 useLocation 钩子，用于获取当前路径
import classnames from 'classnames' // 引入 classnames 库，用于动态设置 class

import { REMOVE_COMPLETED_ITEMS } from '../constants' // 引入常量

// 定义 Todo 接口，表示一个待办事项
// ts的写法，定义一个参数的类型，这个没啥好详细说的，你去看文档或者gpt就懂咋用
interface Todo {
  id: string
  title: string
  completed: boolean
}

// 定义 FooterProps 接口，表示 Footer 组件的属性类型
interface FooterProps {
  todos: Todo[]
  dispatch: React.Dispatch<any>
}

// 定义 Footer 组件，react鼓励定义组件再使用，你可以全局搜索这个Footer组件
export const Footer: React.FC<FooterProps> = ({ todos, dispatch }) => {
  // 获取当前路径名，你可以打印看看
  const { pathname: route } = useLocation()

  // 使用 useMemo 钩子，计算并缓存未完成的待办事项
  // react的一个钩子函数，你可以去官网看看咋用的
  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  )

  // 使用 useCallback 钩子，创建删除已完成事项的函数，并缓存它
  const removeCompleted = useCallback(
    () => dispatch({ type: REMOVE_COMPLETED_ITEMS }),
    [dispatch]
  )

  // 如果待办事项为空，返回 null，不渲染 Footer
  if (todos.length === 0) return null

  // 返回 JSX 结构，渲染 Footer
  // className就是放css中的class名称的，这个classnames我没太管，你可以自己查查
  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count">{`${activeTodos.length} ${
        activeTodos.length === 1 ? 'item' : 'items'
      } left!`}</span>
      <ul className="filters" data-testid="footer-navigation">
        <li>
          <a className={classnames({ selected: route === '/' })} href="#/">
            All
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === '/active' })}
            href="#/active"
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === '/completed' })}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        disabled={activeTodos.length === todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}
