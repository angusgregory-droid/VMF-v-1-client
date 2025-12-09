/**
 * Footer Component Tests
 */

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { format } from 'date-fns'
import { Footer } from './Footer'

// Wrapper for React Router context
const RouterWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

afterEach(() => {
  vi.useRealTimers()
})

describe('Footer Component', () => {
  // ===========================
  // BASIC RENDERING
  // ===========================

  describe('Basic Rendering', () => {
    it('should render footer element', () => {
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('footer')
    })

    it('should render with custom className', () => {
      render(
        <RouterWrapper>
          <Footer className="custom-footer" />
        </RouterWrapper>
      )
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('footer')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  // ===========================
  // COPYRIGHT
  // ===========================

  describe('Copyright', () => {
    it('should render StoryLineOS copyright text', () => {
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )
      expect(screen.getByText(/StoryLineOS. All rights reserved./)).toBeInTheDocument()
    })

    it('should include current year', () => {
      const currentYear = new Date().getFullYear()
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )
      expect(screen.getByText(new RegExp(`© ${currentYear} StoryLineOS. All rights reserved.`))).toBeInTheDocument()
    })

    it('should always render copyright', () => {
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )
      expect(screen.getByText(/©/)).toBeInTheDocument()
    })
  })

  // ===========================
  // DATE & TIME
  // ===========================

  describe('Date & Time', () => {
    it('should render the current date and time', () => {
      vi.useFakeTimers()
      const mockDate = new Date('2025-02-10T15:30:45Z')
      vi.setSystemTime(mockDate)

      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )

      expect(screen.getByText(format(mockDate, 'EEEE, MMMM d, yyyy'))).toBeInTheDocument()
      expect(screen.getByText(format(mockDate, 'hh:mm:ss a'))).toBeInTheDocument()
    })
  })


  // ===========================
  // ACCESSIBILITY
  // ===========================

  describe('Accessibility', () => {
    it('should have contentinfo role', () => {
      render(
        <RouterWrapper>
          <Footer />
        </RouterWrapper>
      )
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })
})
