/**
 * Typewriter Component
 *
 * Displays text with a typewriter effect.
 *
 * Features:
 * - Configurable typing speed and initial delay
 * - Optional looping with pause between cycles
 * - Blinking cursor that can be toggled off
 * - Accessible live region for updates
 *
 * @example
 * <Typewriter text="Hello, world!" />
 *
 * @example
 * <Typewriter
 *   text="StoryLineOS"
 *   speed={75}
 *   delay={300}
 *   loop
 *   pauseBetween={1200}
 * />
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import './Typewriter.css'

export function Typewriter({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  pauseBetween = 1500,
  showCursor = true,
  className = '',
  ariaLabel
}) {
  const safeSpeed = speed > 0 ? speed : 100
  const [current, setCurrent] = useState('')
  const timeoutRef = useRef(null)

  const content = useMemo(() => text ?? '', [text])

  useEffect(() => {
    setCurrent('')

    if (!content) return

    const type = (index) => {
      timeoutRef.current = setTimeout(() => {
        const next = content.slice(0, index + 1)
        setCurrent(next)

        const finished = next.length === content.length

        if (finished) {
          if (loop) {
            timeoutRef.current = setTimeout(() => {
              setCurrent('')
              type(0)
            }, pauseBetween)
          }
          return
        }

        type(index + 1)
      }, safeSpeed)
    }

    timeoutRef.current = setTimeout(() => type(0), Math.max(delay, 0))

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [content, delay, loop, pauseBetween, safeSpeed])

  return (
    <span
      className={`typewriter ${className}`.trim()}
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <span className="typewriter__text">{current}</span>
      {showCursor && <span className="typewriter__cursor" aria-hidden="true"></span>}
    </span>
  )
}

export default Typewriter
