/**
 * Tickbox Component
 *
 * A custom-styled, accessible checkbox component.
 */

import { forwardRef, useEffect, useRef } from 'react'
import './Tickbox.css'

export const Tickbox = forwardRef(function Tickbox(
  {
    id,
    label,
    checked = false,
    indeterminate = false,
    onChange,
    disabled = false,
    size = 'md',
    className = '',
    ...props
  },
  ref
) {
  const localRef = useRef(null)
  const inputRef = ref || localRef

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, inputRef])

  const containerClasses = [
    'tickbox-container',
    `tickbox-container--${size}`,
    disabled && 'tickbox-container--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label htmlFor={id} className={containerClasses}>
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        className="tickbox-input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className="tickbox-box">
        <svg
          className="tickbox-icon"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {indeterminate ? (
            <path
              d="M2.33333 7H11.6667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M11.6667 3.5L5.25 9.91667L2.33333 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </span>
      {label && <span className="tickbox-label">{label}</span>}
    </label>
  )
})

Tickbox.displayName = 'Tickbox'

export default Tickbox
