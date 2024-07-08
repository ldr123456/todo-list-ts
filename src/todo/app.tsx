import React, { useReducer } from 'react' // 引入 React 和 useReducer 钩子
import { Header } from './components/header' // 引入 Header 组件
import { Main } from './components/main' // 引入 Main 组件
import { Footer } from './components/footer' // 引入 Footer 组件

import { todoReducer } from './reducer' // 引入 todoReducer 函数

import './app.css' // 引入样式文件

// 定义一个 React 函数组件 App
// React.FC是react的类型，这个是ts的内容，规定这个App组件的类型为React.FC
export const App: React.FC = () => {
  // 使用 useReducer 钩子管理 todos 状态
  // 这个todoReducer就是在reducer文件里定义的那个方法，在这里用useReducer包裹了一下
  // 这个todos是列表项的所有内容，dispatch是使用那个方法，你可以下面这三组件里找找这个方法的用法
  const [todos, dispatch] = useReducer(todoReducer, [])

  // 返回 JSX 结构，包含 Header、Main 和 Footer 组件
  return (
    <>
      <Header dispatch={dispatch} /> {/* 传递 dispatch 函数给 Header 组件 */}
      <Main todos={todos} dispatch={dispatch} /> {/* 传递 todos 和 dispatch 函数给 Main 组件 */}
      <Footer todos={todos} dispatch={dispatch} /> {/* 传递 todos 和 dispatch 函数给 Footer 组件 */}
    </>
  )
}
