/**
 * Avatar Component Tests
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'

describe('Avatar Component', () => {
  // ===========================
  // BASIC RENDERING
  // ===========================

  describe('Basic Rendering', () => {
    it('should render avatar with initials', () => {
      render(<Avatar name="John Doe" />)
      const avatar = screen.getByLabelText('John Doe')
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveTextContent('JD')
    })

    it('should render avatar with image', () => {
      render(<Avatar src="/user.jpg" alt="User" />)
      const img = screen.getByAltText('User')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/user.jpg')
    })

    it('should use name as alt text when alt not provided', () => {
      render(<Avatar src="/user.jpg" name="Jane Smith" />)
      const img = screen.getByAltText('Jane Smith')
      expect(img).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(<Avatar name="Test" className="custom-avatar" />)
      const avatar = container.firstChild
      expect(avatar).toHaveClass('avatar')
      expect(avatar).toHaveClass('custom-avatar')
    })
  })

  // ===========================
  // INITIALS GENERATION
  // ===========================

  describe('Initials Generation', () => {
    it('should generate initials from first and last name', () => {
      render(<Avatar name="John Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should generate initials from single name', () => {
      render(<Avatar name="Madonna" />)
      expect(screen.getByText('MA')).toBeInTheDocument()
    })

    it('should generate initials from three or more names', () => {
      render(<Avatar name="John Michael Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should handle names with extra spaces', () => {
      render(<Avatar name="  John   Doe  " />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should show question mark when no name provided', () => {
      render(<Avatar />)
      expect(screen.getByText('?')).toBeInTheDocument()
    })

    it('should uppercase initials', () => {
      render(<Avatar name="john doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  // ===========================
  // SIZES
  // ===========================

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      const { container } = render(<Avatar name="Test" />)
      const avatar = container.firstChild
      expect(avatar).toHaveClass('avatar--md')
    })

    it('should apply xs size', () => {
      const { container } = render(<Avatar name="Test" size="xs" />)
      expect(container.firstChild).toHaveClass('avatar--xs')
    })

    it('should apply sm size', () => {
      const { container } = render(<Avatar name="Test" size="sm" />)
      expect(container.firstChild).toHaveClass('avatar--sm')
    })

    it('should apply lg size', () => {
      const { container } = render(<Avatar name="Test" size="lg" />)
      expect(container.firstChild).toHaveClass('avatar--lg')
    })

    it('should apply xl size', () => {
      const { container } = render(<Avatar name="Test" size="xl" />)
      expect(container.firstChild).toHaveClass('avatar--xl')
    })
  })

  // ===========================
  // SHAPES
  // ===========================

  describe('Shapes', () => {
    it('should apply circle shape by default', () => {
      const { container } = render(<Avatar name="Test" />)
      expect(container.firstChild).toHaveClass('avatar--circle')
    })

    it('should apply square shape', () => {
      const { container } = render(<Avatar name="Test" shape="square" />)
      expect(container.firstChild).toHaveClass('avatar--square')
    })

    it('should apply rounded shape', () => {
      const { container } = render(<Avatar name="Test" shape="rounded" />)
      expect(container.firstChild).toHaveClass('avatar--rounded')
    })
  })

  // ===========================
  // STATUS INDICATORS
  // ===========================

  describe('Status Indicators', () => {
    it('should not show status indicator by default', () => {
      render(<Avatar name="Test" />)
      const status = screen.queryByRole('status')
      expect(status).not.toBeInTheDocument()
    })

    it('should show online status', () => {
      render(<Avatar name="Test" status="online" />)
      const status = screen.getByRole('status')
      expect(status).toBeInTheDocument()
      expect(status).toHaveClass('avatar__status--online')
      expect(status).toHaveAttribute('aria-label', 'Status: online')
    })

    it('should show offline status', () => {
      render(<Avatar name="Test" status="offline" />)
      const status = screen.getByRole('status')
      expect(status).toHaveClass('avatar__status--offline')
    })

    it('should show away status', () => {
      render(<Avatar name="Test" status="away" />)
      const status = screen.getByRole('status')
      expect(status).toHaveClass('avatar__status--away')
    })

    it('should show busy status', () => {
      render(<Avatar name="Test" status="busy" />)
      const status = screen.getByRole('status')
      expect(status).toHaveClass('avatar__status--busy')
    })

    it('should add has-status class when status is present', () => {
      const { container } = render(<Avatar name="Test" status="online" />)
      expect(container.firstChild).toHaveClass('avatar--has-status')
    })
  })

  // ===========================
  // IMAGE FALLBACK
  // ===========================

  describe('Image Fallback', () => {
    it('should show initials when image fails to load', () => {
      render(<Avatar src="/broken.jpg" name="John Doe" />)
      const img = screen.getByAltText('John Doe')

      // Simulate image error
      img.dispatchEvent(new Event('error'))

      // Image should be hidden
      expect(img).toHaveStyle({ display: 'none' })
    })
  })

  // ===========================
  // COMBINED FEATURES
  // ===========================

  describe('Combined Features', () => {
    it('should handle all props together', () => {
      const { container } = render(
        <Avatar
          name="Jane Smith"
          size="lg"
          shape="rounded"
          status="online"
          className="custom"
        />
      )

      const avatar = container.firstChild
      expect(avatar).toHaveClass('avatar')
      expect(avatar).toHaveClass('avatar--lg')
      expect(avatar).toHaveClass('avatar--rounded')
      expect(avatar).toHaveClass('avatar--has-status')
      expect(avatar).toHaveClass('custom')
      expect(screen.getByText('JS')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should handle image with status', () => {
      render(<Avatar src="/user.jpg" alt="User" status="online" />)
      expect(screen.getByAltText('User')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  // ===========================
  // ACCESSIBILITY
  // ===========================

  describe('Accessibility', () => {
    it('should have proper aria-label for initials', () => {
      render(<Avatar name="John Doe" />)
      const initials = screen.getByLabelText('John Doe')
      expect(initials).toBeInTheDocument()
    })

    it('should have proper alt text for images', () => {
      render(<Avatar src="/user.jpg" alt="Profile picture" />)
      const img = screen.getByAltText('Profile picture')
      expect(img).toBeInTheDocument()
    })

    it('should have status role for status indicator', () => {
      render(<Avatar name="Test" status="online" />)
      const status = screen.getByRole('status')
      expect(status).toHaveAttribute('aria-label', 'Status: online')
    })

    it('should support custom props', () => {
      render(<Avatar name="Test" data-testid="custom-avatar" />)
      expect(screen.getByTestId('custom-avatar')).toBeInTheDocument()
    })
  })
})
