import React, { useCallback } from 'react' // 引入 React 和 useCallback 钩子

// 定义一个函数，用于转义字符串中的特殊字符，防止 XSS 攻击
const sanitize = (string: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  const reg = /[&<>"'/]/gi
  return string.replace(reg, (match) => map[match])
}

// 定义一个函数，检查字符串的长度是否满足最小长度要求
const hasValidMin = (value: string, min: number): boolean => {
  return value.length >= min
}

// 定义输入组件的属性接口
interface InputProps {
  onSubmit: (value: string) => void
  placeholder: string
  label: string
  defaultValue?: string
  onBlur?: () => void
}

// 定义并导出 Input 组件
// InputProps规定了这个Input组件需要的参数的类型有这些
export const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur
}) => {
  // 使用 useCallback 钩子定义 handleBlur 函数，并缓存它
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur()
  }, [onBlur])

  // 使用 useCallback 钩子定义 handleKeyDown 函数，并缓存它
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const value = e.currentTarget.value.trim()

        // 检查输入值的长度是否至少为2
        if (!hasValidMin(value, 2)) return

        // 调用 onSubmit 函数，并传入转义后的值
        onSubmit(sanitize(value))
        // 清空输入框
        e.currentTarget.value = ''
      }
    },
    [onSubmit]
  )

  // 返回 JSX 结构，渲染 Input 组件
  return (
    <div className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <label className="visually-hidden" htmlFor="todo-input">
        {label}
      </label>
    </div>
  )
}
