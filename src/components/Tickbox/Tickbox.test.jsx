import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tickbox } from './Tickbox'

describe('Tickbox Component', () => {
  it('should render the tickbox and label', () => {
    render(<Tickbox id="test-tickbox" label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('should toggle checked state on click', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Tickbox
        id="test-tickbox"
        label="Accept terms"
        checked={false}
        onChange={handleChange}
      />
    )

    const tickbox = screen.getByLabelText('Accept terms')
    await user.click(tickbox)

    expect(handleChange).toHaveBeenCalledTimes(1)

    rerender(
      <Tickbox
        id="test-tickbox"
        label="Accept terms"
        checked={true}
        onChange={handleChange}
      />
    )
    expect(tickbox).toBeChecked()
  })

  it('should not toggle when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Tickbox
        id="test-tickbox"
        label="Accept terms"
        checked={false}
        onChange={handleChange}
        disabled
      />
    )

    const tickbox = screen.getByLabelText('Accept terms')
    await user.click(tickbox)

    expect(handleChange).not.toHaveBeenCalled()
    expect(tickbox).not.toBeChecked()
  })

  it('should be accessible via keyboard', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Tickbox
        id="test-tickbox"
        label="Accept terms"
        checked={false}
        onChange={handleChange}
      />
    )

    const tickbox = screen.getByLabelText('Accept terms')
    tickbox.focus()
    await user.keyboard(' ')

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  // New tests for size
  describe('Sizes', () => {
    it('should apply small size', () => {
      const { container } = render(<Tickbox size="sm" />)
      expect(container.querySelector('.tickbox-container')).toHaveClass('tickbox-container--sm')
    })

    it('should apply medium size by default', () => {
      const { container } = render(<Tickbox />)
      expect(container.querySelector('.tickbox-container')).toHaveClass('tickbox-container--md')
    })

    it('should apply large size', () => {
      const { container } = render(<Tickbox size="lg" />)
      expect(container.querySelector('.tickbox-container')).toHaveClass('tickbox-container--lg')
    })
  })

  // New tests for indeterminate state
  describe('Indeterminate State', () => {
    it('should set the indeterminate property on the input', () => {
      const { container } = render(<Tickbox indeterminate />)
      const input = container.querySelector('input')
      expect(input.indeterminate).toBe(true)
    })

    it('should not be checked when indeterminate', () => {
      const { container } = render(<Tickbox indeterminate />)
      const input = container.querySelector('input')
      expect(input.checked).toBe(false)
    })

    it('should have indeterminate styles', () => {
      const { container } = render(<Tickbox indeterminate />)
      const box = container.querySelector('.tickbox-box')
      // This is a visual test, in a real scenario you would use storybook or visual regression testing
      // For now we assume the CSS classes are applied correctly and do their job.
      // We can check if the icon for indeterminate is rendered.
      const iconPath = container.querySelector('svg path')
      expect(iconPath).toHaveAttribute('d', 'M2.33333 7H11.6667')
    })
  })
})
