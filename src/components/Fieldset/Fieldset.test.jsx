/**
 * Fieldset Component Tests
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Fieldset } from './Fieldset'

describe('Fieldset Component', () => {
  // ===========================
  // BASIC RENDERING
  // ===========================

  describe('Basic Rendering', () => {
    it('should render fieldset element', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Legend>Legend</Fieldset.Legend>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toBeInTheDocument()
      expect(fieldset).toHaveClass('fieldset')
    })

    it('should render with legend and content', () => {
      render(
        <Fieldset>
          <Fieldset.Legend>Form Section</Fieldset.Legend>
          <Fieldset.Content>Form fields go here</Fieldset.Content>
        </Fieldset>
      )

      expect(screen.getByText('Form Section')).toBeInTheDocument()
      expect(screen.getByText('Form fields go here')).toBeInTheDocument()
    })

    it('should have default classes', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toHaveClass('fieldset--default')
      expect(fieldset).toHaveClass('fieldset--gap-md')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Fieldset className="custom-fieldset">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('custom-fieldset')
    })
  })

  // ===========================
  // VARIANTS
  // ===========================

  describe('Variants', () => {
    it('should apply default variant', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--default')
    })

    it('should apply outlined variant', () => {
      const { container } = render(
        <Fieldset variant="outlined">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--outlined')
    })

    it('should apply filled variant', () => {
      const { container } = render(
        <Fieldset variant="filled">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--filled')
    })
  })

  // ===========================
  // GAP SIZES
  // ===========================

  describe('Gap Sizes', () => {
    it('should apply small gap', () => {
      const { container } = render(
        <Fieldset gap="sm">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--gap-sm')
    })

    it('should apply medium gap (default)', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--gap-md')
    })

    it('should apply large gap', () => {
      const { container } = render(
        <Fieldset gap="lg">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--gap-lg')
    })

    it('should apply extra large gap', () => {
      const { container } = render(
        <Fieldset gap="xl">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      expect(container.querySelector('fieldset')).toHaveClass('fieldset--gap-xl')
    })
  })

  // ===========================
  // DISABLED STATE
  // ===========================

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).not.toHaveAttribute('disabled')
    })

    it('should apply disabled attribute', () => {
      const { container } = render(
        <Fieldset disabled>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toHaveAttribute('disabled')
    })

    it('should disable all form elements inside when disabled', () => {
      render(
        <Fieldset disabled>
          <Fieldset.Content>
            <input type="text" data-testid="input" />
            <button data-testid="button">Click</button>
          </Fieldset.Content>
        </Fieldset>
      )

      const input = screen.getByTestId('input')
      const button = screen.getByTestId('button')

      // Native fieldset disabled attribute disables all form controls
      expect(input).toBeDisabled()
      expect(button).toBeDisabled()
    })
  })

  // ===========================
  // LEGEND
  // ===========================

  describe('Legend', () => {
    it('should render legend element', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Legend>Legend Text</Fieldset.Legend>
        </Fieldset>
      )

      const legend = container.querySelector('legend')
      expect(legend).toBeInTheDocument()
      expect(legend).toHaveClass('fieldset__legend')
      expect(legend).toHaveTextContent('Legend Text')
    })

    it('should apply custom className to legend', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Legend className="custom-legend">Legend</Fieldset.Legend>
        </Fieldset>
      )

      const legend = container.querySelector('legend')
      expect(legend).toHaveClass('custom-legend')
    })
  })

  // ===========================
  // CONTENT
  // ===========================

  describe('Content', () => {
    it('should render content div', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content>Content here</Fieldset.Content>
        </Fieldset>
      )

      const content = container.querySelector('.fieldset__content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveTextContent('Content here')
    })

    it('should apply custom className to content', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Content className="custom-content">Content</Fieldset.Content>
        </Fieldset>
      )

      const content = container.querySelector('.fieldset__content')
      expect(content).toHaveClass('custom-content')
    })

    it('should render multiple children in content', () => {
      render(
        <Fieldset>
          <Fieldset.Content>
            <div data-testid="child-1">Child 1</div>
            <div data-testid="child-2">Child 2</div>
            <div data-testid="child-3">Child 3</div>
          </Fieldset.Content>
        </Fieldset>
      )

      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
      expect(screen.getByTestId('child-3')).toBeInTheDocument()
    })
  })

  // ===========================
  // COMBINED FEATURES
  // ===========================

  describe('Combined Features', () => {
    it('should handle all props together', () => {
      const { container } = render(
        <Fieldset
          variant="outlined"
          gap="lg"
          disabled
          className="custom-fieldset"
        >
          <Fieldset.Legend className="custom-legend">Form Section</Fieldset.Legend>
          <Fieldset.Content className="custom-content">
            <input type="text" />
            <button>Submit</button>
          </Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toHaveClass('fieldset--outlined')
      expect(fieldset).toHaveClass('fieldset--gap-lg')
      expect(fieldset).toHaveClass('custom-fieldset')
      expect(fieldset).toHaveAttribute('disabled')

      const legend = container.querySelector('legend')
      expect(legend).toHaveClass('custom-legend')

      const content = container.querySelector('.fieldset__content')
      expect(content).toHaveClass('custom-content')
    })
  })

  // ===========================
  // ACCESSIBILITY
  // ===========================

  describe('Accessibility', () => {
    it('should use native fieldset element', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Legend>Accessible Form</Fieldset.Legend>
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = container.querySelector('fieldset')
      expect(fieldset.tagName).toBe('FIELDSET')
    })

    it('should use native legend element', () => {
      const { container } = render(
        <Fieldset>
          <Fieldset.Legend>Legend</Fieldset.Legend>
        </Fieldset>
      )

      const legend = container.querySelector('legend')
      expect(legend.tagName).toBe('LEGEND')
    })

    it('should support custom attributes', () => {
      render(
        <Fieldset data-testid="test-fieldset" aria-label="Test fieldset">
          <Fieldset.Content>Content</Fieldset.Content>
        </Fieldset>
      )

      const fieldset = screen.getByTestId('test-fieldset')
      expect(fieldset).toHaveAttribute('aria-label', 'Test fieldset')
    })
  })
})
