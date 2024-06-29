import React, { useCallback } from 'react'

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

const hasValidMin = (value: string, min: number): boolean => {
  return value.length >= min
}

interface InputProps {
  onSubmit: (value: string) => void
  placeholder: string
  label: string
  defaultValue?: string
  onBlur?: () => void
}

export const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder,
  label,
  defaultValue,
  onBlur
}) => {
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur()
  }, [onBlur])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const value = e.currentTarget.value.trim()

        if (!hasValidMin(value, 2)) return

        onSubmit(sanitize(value))
        e.currentTarget.value = ''
      }
    },
    [onSubmit]
  )

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
