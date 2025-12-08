/**
 * Typewriter Component Tests
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { Typewriter } from './Typewriter'

afterEach(() => {
  vi.useRealTimers()
})

describe('Typewriter Component', () => {
  it('should render and type out the full text', async () => {
    vi.useFakeTimers()
    const { container } = render(<Typewriter text="Hello" speed={50} />)

    expect(container.querySelector('.typewriter__text')?.textContent).toBe('')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should respect initial delay', async () => {
    vi.useFakeTimers()
    const { container } = render(<Typewriter text="Hi" speed={50} delay={200} />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150)
    })
    expect(container.querySelector('.typewriter__text')?.textContent).toBe('')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200)
    })
    expect(container.querySelector('.typewriter__text')?.textContent).toBe('Hi')
  })

  it('should render cursor when enabled', () => {
    const { container } = render(<Typewriter text="Cursor" showCursor />)
    expect(container.querySelector('.typewriter__cursor')).toBeInTheDocument()
  })

  it('should hide cursor when disabled', () => {
    const { container } = render(<Typewriter text="No Cursor" showCursor={false} />)
    expect(container.querySelector('.typewriter__cursor')).toBeNull()
  })
})
