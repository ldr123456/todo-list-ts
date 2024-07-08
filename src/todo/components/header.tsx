import React, { useCallback } from 'react' // 引入 React 和 useCallback 钩子
import { Input } from './input' // 引入自定义的 Input 组件

import { ADD_ITEM } from '../constants' // 引入常量

// 定义 Header 组件的属性接口
interface HeaderProps {
  dispatch: React.Dispatch<any> 
}

// 定义 Header 组件
export const Header: React.FC<HeaderProps> = ({ dispatch }) => {
  // 使用 useCallback 钩子定义 addItem 函数，并缓存它
  const addItem = useCallback(
    (title: string) => dispatch({ type: ADD_ITEM, payload: { title } }),
    [dispatch]
  )

  // 返回 JSX 结构，渲染 Header
  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={addItem} // 当 Input 组件提交时，调用 addItem 函数
        label="New Todo Input" // 设置 Input 组件的标签
        placeholder="What needs to be done?" // 设置 Input 组件的占位符
      />
    </header>
  )
}
