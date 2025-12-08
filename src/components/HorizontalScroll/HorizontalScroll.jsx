/**
 * HorizontalScroll Component
 *
 * Provides a full-width horizontally scrollable container with optional snap alignment.
 */

import { useMemo } from 'react'
import './HorizontalScroll.css'

const gapMap = {
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
}

export function HorizontalScroll({
  children,
  gap = 'md',
  snap = false,
  ariaLabel = 'Horizontal content',
  className = '',
  ...props
}) {
  const gapValue = useMemo(() => gapMap[gap] || gapMap.md, [gap])

  return (
    <div className={['h-scroll', className].filter(Boolean).join(' ')} {...props}>
      <div
        className={['h-scroll__track', snap && 'h-scroll__track--snap'].filter(Boolean).join(' ')}
        style={{ gap: gapValue }}
        aria-label={ariaLabel}
        role="region"
      >
        {children}
      </div>
    </div>
  )
}

export default HorizontalScroll
