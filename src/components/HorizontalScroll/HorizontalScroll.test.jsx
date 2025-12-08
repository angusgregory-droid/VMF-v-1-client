/**
 * HorizontalScroll Component Tests
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HorizontalScroll } from './HorizontalScroll'

const items = Array.from({ length: 5 }, (_, i) => (
  <div key={i} style={{ minWidth: '200px' }}>
    Item {i + 1}
  </div>
))

describe('HorizontalScroll', () => {
  it('renders children', () => {
    render(<HorizontalScroll>{items}</HorizontalScroll>)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 5')).toBeInTheDocument()
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Horizontal content')
  })

  it('respects custom aria label', () => {
    render(<HorizontalScroll ariaLabel="Stories">{items}</HorizontalScroll>)
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Stories')
  })

  it('applies snap class when snap is enabled', () => {
    render(<HorizontalScroll snap>{items}</HorizontalScroll>)
    const track = screen.getByRole('region')
    expect(track).toHaveClass('h-scroll__track--snap')
  })

  it('applies custom className', () => {
    const { container } = render(<HorizontalScroll className="custom-class">{items}</HorizontalScroll>)
    expect(container.querySelector('.h-scroll.custom-class')).toBeInTheDocument()
  })
})
