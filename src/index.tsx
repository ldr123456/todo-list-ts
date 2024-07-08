import React from 'react' // 导入 React 库
import { render } from 'react-dom' // 从 react-dom 库中导入 render 方法
import { HashRouter, Route, Routes } from 'react-router-dom' // 从 react-router-dom 库中导入 HashRouter, Route 和 Routes 组件

import { App } from './todo/app' // 导入自定义的 App 组件
import 'todomvc-app-css/index.css' // 导入 CSS 样式文件

// 把这个文件理解成项目的入口就行

// 使用 render 方法将 React 组件渲染到页面中
render(
  // 使用 HashRouter 组件包裹整个应用，启用基于 hash 的路由
  <HashRouter>
    <Routes>
      {/* 定义路由规则，所有路径都将匹配 App 组件 */}
      <Route path="*" element={<App />} />
    </Routes>
  </HashRouter>,
  // 指定渲染的目标 DOM 元素
  document.getElementById('root')
)
