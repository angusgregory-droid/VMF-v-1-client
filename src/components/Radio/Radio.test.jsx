/**
 * Radio Component Tests
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio } from './Radio'

describe('Radio Component', () => {
  it('should render the radio button and label', () => {
    render(<Radio id="test-radio" name="test-group" value="option1" label="Option 1" />)
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('should select radio button on click', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Radio
        id="test-radio"
        name="test-group"
        value="option1"
        label="Option 1"
        checked={false}
        onChange={handleChange}
      />
    )

    const radio = screen.getByLabelText('Option 1')
    await user.click(radio)

    expect(handleChange).toHaveBeenCalledTimes(1)
    const callEvent = handleChange.mock.calls[0][0]
    expect(callEvent.target.value).toBe('option1')

    rerender(
      <Radio
        id="test-radio"
        name="test-group"
        value="option1"
        label="Option 1"
        checked={true}
        onChange={handleChange}
      />
    )
    expect(radio).toBeChecked()
  })

  it('should not select when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Radio
        id="test-radio"
        name="test-group"
        value="option1"
        label="Option 1"
        checked={false}
        onChange={handleChange}
        disabled
      />
    )

    const radio = screen.getByLabelText('Option 1')
    await user.click(radio)

    expect(handleChange).not.toHaveBeenCalled()
    expect(radio).not.toBeChecked()
  })

  it('should be accessible via keyboard', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Radio
        id="test-radio"
        name="test-group"
        value="option1"
        label="Option 1"
        checked={false}
        onChange={handleChange}
      />
    )

    const radio = screen.getByLabelText('Option 1')
    radio.focus()
    await user.keyboard(' ')

    expect(handleChange).toHaveBeenCalledTimes(1)
    const callEvent = handleChange.mock.calls[0][0]
    expect(callEvent.target.value).toBe('option1')
  })

  // New tests for size
  describe('Sizes', () => {
    it('should apply small size', () => {
      const { container } = render(<Radio size="sm" />)
      expect(container.querySelector('.radio-container')).toHaveClass('radio-container--sm')
    })

    it('should apply medium size by default', () => {
      const { container } = render(<Radio />)
      expect(container.querySelector('.radio-container')).toHaveClass('radio-container--md')
    })

    it('should apply large size', () => {
      const { container } = render(<Radio size="lg" />)
      expect(container.querySelector('.radio-container')).toHaveClass('radio-container--lg')
    })
  })

  describe('Radio Group Behavior', () => {
    it('should allow only one radio button in a group to be selected', async () => {
      const user = userEvent.setup()
      const mockOnChange1 = vi.fn()
      const mockOnChange2 = vi.fn()
      const mockOnChange3 = vi.fn()

      const { rerender } = render(
        <>
          <Radio id="radio1" name="myGroup" value="opt1" label="Option 1" checked={false} onChange={mockOnChange1} />
          <Radio id="radio2" name="myGroup" value="opt2" label="Option 2" checked={false} onChange={mockOnChange2} />
          <Radio id="radio3" name="myGroup" value="opt3" label="Option 3" checked={false} onChange={mockOnChange3} />
        </>
      )

      const radio1 = screen.getByLabelText('Option 1')
      const radio2 = screen.getByLabelText('Option 2')
      const radio3 = screen.getByLabelText('Option 3')

      // Select Option 2
      await user.click(radio2)
      expect(mockOnChange2).toHaveBeenCalledTimes(1)
      rerender(
        <>
          <Radio id="radio1" name="myGroup" value="opt1" label="Option 1" checked={false} onChange={mockOnChange1} />
          <Radio id="radio2" name="myGroup" value="opt2" label="Option 2" checked={true} onChange={mockOnChange2} />
          <Radio id="radio3" name="myGroup" value="opt3" label="Option 3" checked={false} onChange={mockOnChange3} />
        </>
      )
      expect(radio2).toBeChecked()
      expect(radio1).not.toBeChecked()
      expect(radio3).not.toBeChecked()

      // Select Option 1
      await user.click(radio1)
      expect(mockOnChange1).toHaveBeenCalledTimes(1)
      rerender(
        <>
          <Radio id="radio1" name="myGroup" value="opt1" label="Option 1" checked={true} onChange={mockOnChange1} />
          <Radio id="radio2" name="myGroup" value="opt2" label="Option 2" checked={false} onChange={mockOnChange2} />
          <Radio id="radio3" name="myGroup" value="opt3" label="Option 3" checked={false} onChange={mockOnChange3} />
        </>
      )
      expect(radio1).toBeChecked()
      expect(radio2).not.toBeChecked() // This is the key check
      expect(radio3).not.toBeChecked()
    })
  })
})
