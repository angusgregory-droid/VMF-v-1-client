/**
 * Stepper Component Tests
 *
 * Tests cover:
 * - Basic rendering
 * - Orientation variants
 * - Step indicator states
 * - Navigation behavior
 * - Callbacks
 * - Keyboard navigation
 * - Accessibility
 * - Error handling
 * - Complex scenarios
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stepper } from './Stepper'

describe('Stepper Component', () => {
  // ===========================
  // BASIC RENDERING
  // ===========================

  describe('Basic Rendering', () => {
    it('should render stepper with panels', () => {
      render(
        <Stepper>
          <Stepper.Panel>Step 1</Stepper.Panel>
          <Stepper.Panel>Step 2</Stepper.Panel>
          <Stepper.Panel>Step 3</Stepper.Panel>
        </Stepper>
      )

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByText('Step 1')).toBeInTheDocument()
    })

    it('should have default classes', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      expect(container.firstChild).toHaveClass('stepper')
      expect(container.firstChild).toHaveClass('stepper--horizontal')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Stepper className="custom-stepper">
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      expect(container.firstChild).toHaveClass('custom-stepper')
    })

    it('should render multiple panels', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')
      expect(indicators).toHaveLength(3)
    })

    it('should only show active panel content', () => {
      render(
        <Stepper defaultActiveStep={0}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      expect(screen.getByText('Panel 1')).toBeInTheDocument()
      expect(screen.queryByText('Panel 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()
    })
  })

  // ===========================
  // ORIENTATION
  // ===========================

  describe('Orientation', () => {
    it('should apply horizontal orientation by default', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      expect(container.firstChild).toHaveClass('stepper--horizontal')
    })

    it('should apply vertical orientation when specified', () => {
      const { container } = render(
        <Stepper orientation="vertical">
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      expect(container.firstChild).toHaveClass('stepper--vertical')
    })

    it('should have track element', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      const track = container.querySelector('.stepper__track')
      expect(track).toBeInTheDocument()
    })
  })

  // ===========================
  // STEP INDICATORS
  // ===========================

  describe('Step Indicators', () => {
    it('should render indicator for each panel', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')
      expect(indicators).toHaveLength(3)
    })

    it('should display numbers for incomplete steps', () => {
      render(
        <Stepper defaultActiveStep={0}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      expect(screen.getByLabelText('Step 1 (current)')).toBeInTheDocument()
      expect(screen.getByLabelText('Step 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Step 3')).toBeInTheDocument()
    })

    it('should display checkmark for completed steps', () => {
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const checkIcons = container.querySelectorAll('.stepper__check-icon')
      expect(checkIcons).toHaveLength(2) // Steps 0 and 1 are completed
    })

    it('should highlight active step', () => {
      const { container } = render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')
      expect(indicators[1]).toHaveClass('stepper__indicator--active')
    })

    it('should show previous steps as completed', () => {
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')
      expect(indicators[0]).toHaveClass('stepper__indicator--completed')
      expect(indicators[1]).toHaveClass('stepper__indicator--completed')
      expect(indicators[2]).toHaveClass('stepper__indicator--active')
    })
  })

  // ===========================
  // NAVIGATION
  // ===========================

  describe('Navigation', () => {
    it('should start at defaultActiveStep', () => {
      render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      expect(screen.getByText('Panel 2')).toBeInTheDocument()
      expect(screen.queryByText('Panel 1')).not.toBeInTheDocument()
    })

    it('should allow clicking on completed steps', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Click on first step (completed)
      await user.click(indicators[0])

      expect(screen.getByText('Panel 1')).toBeInTheDocument()
      expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()
    })

    it('should prevent clicking on future steps', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={0}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Try to click on third step (not completed)
      await user.click(indicators[2])

      // Should still show Panel 1
      expect(screen.getByText('Panel 1')).toBeInTheDocument()
      expect(screen.queryByText('Panel 3')).not.toBeInTheDocument()
    })

    it('should allow clicking on current step (does nothing)', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Click on current step
      await user.click(indicators[1])

      // Should still show Panel 2
      expect(screen.getByText('Panel 2')).toBeInTheDocument()
    })

    it('should navigate backward to completed steps', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Navigate back to step 1
      await user.click(indicators[1])

      expect(screen.getByText('Panel 2')).toBeInTheDocument()
    })
  })

  // ===========================
  // CALLBACKS
  // ===========================

  describe('Callbacks', () => {
    it('should call prevCallback when navigating backward', async () => {
      const prevCallback = vi.fn()
      const user = userEvent.setup()

      const { container } = render(
        <Stepper defaultActiveStep={2} prevCallback={prevCallback}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Click backward to step 1
      await user.click(indicators[1])

      expect(prevCallback).toHaveBeenCalledWith(2) // Called with current index before navigation
    })

    it('should pass current step index to prevCallback', async () => {
      const prevCallback = vi.fn()
      const user = userEvent.setup()

      const { container } = render(
        <Stepper defaultActiveStep={1} prevCallback={prevCallback}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      await user.click(indicators[0])

      expect(prevCallback).toHaveBeenCalledWith(1)
    })

    it('should not call callbacks when clicking current step', async () => {
      const prevCallback = vi.fn()
      const nextCallback = vi.fn()
      const user = userEvent.setup()

      const { container } = render(
        <Stepper
          defaultActiveStep={1}
          prevCallback={prevCallback}
          nextCallback={nextCallback}
        >
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      await user.click(indicators[1])

      expect(prevCallback).not.toHaveBeenCalled()
      expect(nextCallback).not.toHaveBeenCalled()
    })
  })

  // ===========================
  // KEYBOARD NAVIGATION
  // ===========================

  describe('Keyboard Navigation', () => {
    it('should activate step with Enter key', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      indicators[0].focus()
      await user.keyboard('{Enter}')

      expect(screen.getByText('Panel 1')).toBeInTheDocument()
    })

    it('should activate step with Space key', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      indicators[1].focus()
      await user.keyboard(' ')

      expect(screen.getByText('Panel 2')).toBeInTheDocument()
    })

    it('should not activate inactive steps with keyboard', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={0}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      indicators[2].focus()
      await user.keyboard('{Enter}')

      // Should still show Panel 1
      expect(screen.getByText('Panel 1')).toBeInTheDocument()
    })
  })

  // ===========================
  // ACCESSIBILITY
  // ===========================

  describe('Accessibility', () => {
    it('should have navigation role on container', () => {
      render(
        <Stepper>
          <Stepper.Panel>Content</Stepper.Panel>
        </Stepper>
      )

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Progress steps')
    })

    it('should have aria-current on active step', () => {
      const { container } = render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')
      expect(indicators[1]).toHaveAttribute('aria-current', 'step')
      expect(indicators[0]).not.toHaveAttribute('aria-current')
    })

    it('should have descriptive aria-labels on indicators', () => {
      render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      expect(screen.getByLabelText('Step 1 (completed)')).toBeInTheDocument()
      expect(screen.getByLabelText('Step 2 (current)')).toBeInTheDocument()
      expect(screen.getByLabelText('Step 3')).toBeInTheDocument()
    })

    it('should have tabpanel role on panels', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Panel Content</Stepper.Panel>
        </Stepper>
      )

      const panel = container.querySelector('.stepper__panel')
      expect(panel).toHaveAttribute('role', 'tabpanel')
    })

    it('should have aria-hidden on decorative connectors', () => {
      const { container } = render(
        <Stepper>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
        </Stepper>
      )

      const connector = container.querySelector('.stepper__connector')
      expect(connector).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have correct tabindex on indicators', () => {
      const { container } = render(
        <Stepper defaultActiveStep={1}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Completed and active steps should be focusable
      expect(indicators[0]).toHaveAttribute('tabIndex', '0')
      expect(indicators[1]).toHaveAttribute('tabIndex', '0')

      // Future steps should not be focusable
      expect(indicators[2]).toHaveAttribute('tabIndex', '-1')
    })
  })

  // ===========================
  // ERROR HANDLING
  // ===========================

  describe('Error Handling', () => {
    it('should throw error when Panel used outside Stepper', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(<Stepper.Panel>Content</Stepper.Panel>)
      }).toThrow('Stepper.Panel must be used within Stepper')

      consoleSpy.mockRestore()
    })

    it('should handle empty children array', () => {
      const { container } = render(<Stepper />)

      expect(container.firstChild).toHaveClass('stepper')
    })
  })

  // ===========================
  // COMPLEX SCENARIOS
  // ===========================

  describe('Complex Scenarios', () => {
    it('should handle complete workflow (forward and backward)', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Go back to step 1 (completed)
      await user.click(indicators[0])
      expect(screen.getByText('Panel 1')).toBeInTheDocument()

      // Go forward to step 2 (also completed since we started at step 3)
      await user.click(indicators[1])
      expect(screen.getByText('Panel 2')).toBeInTheDocument()

      // Go back to step 1 again
      await user.click(indicators[0])
      expect(screen.getByText('Panel 1')).toBeInTheDocument()
    })

    it('should maintain completed state when navigating back', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Stepper defaultActiveStep={2}>
          <Stepper.Panel>Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
          <Stepper.Panel>Panel 3</Stepper.Panel>
        </Stepper>
      )

      const indicators = container.querySelectorAll('.stepper__indicator')

      // Navigate back to step 1
      await user.click(indicators[0])

      // Steps 0 and 1 should still be marked as completed
      expect(indicators[0]).toHaveClass('stepper__indicator--completed')
      expect(indicators[1]).toHaveClass('stepper__indicator--completed')
    })

    it('should work with all props together', () => {
      const prevCallback = vi.fn()
      const nextCallback = vi.fn()
      const { container } = render(
        <Stepper
          defaultActiveStep={1}
          orientation="vertical"
          prevCallback={prevCallback}
          nextCallback={nextCallback}
          className="custom-class"
        >
          <Stepper.Panel className="custom-panel">Panel 1</Stepper.Panel>
          <Stepper.Panel>Panel 2</Stepper.Panel>
        </Stepper>
      )

      expect(container.firstChild).toHaveClass('stepper--vertical')
      expect(container.firstChild).toHaveClass('custom-class')
      expect(screen.getByText('Panel 2')).toBeInTheDocument()
    })
  })
})
