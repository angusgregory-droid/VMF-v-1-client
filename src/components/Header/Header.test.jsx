/**
 * Header Component Tests
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './Header'

// Wrapper for React Router context
const RouterWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

describe('Header Component', () => {
  // ===========================
  // BASIC RENDERING
  // ===========================

  describe('Basic Rendering', () => {
    it('should render header element', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      )
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('header')
    })

    it('should render with custom className', () => {
      render(
        <RouterWrapper>
          <Header className="custom-header" />
        </RouterWrapper>
      )
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('header')
      expect(header).toHaveClass('custom-header')
    })

    it('should be sticky by default', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      )
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('header--sticky')
    })

    it('should not be sticky when sticky=false', () => {
      render(
        <RouterWrapper>
          <Header sticky={false} />
        </RouterWrapper>
      )
      const header = screen.getByRole('banner')
      expect(header).not.toHaveClass('header--sticky')
    })
  })

  // ===========================
  // LOGO
  // ===========================

  describe('Logo', () => {
    it('should render default text logo', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      )
      expect(screen.getByText('App')).toBeInTheDocument()
    })

    it('should render custom text logo', () => {
      render(
        <RouterWrapper>
          <Header logo="My Company" />
        </RouterWrapper>
      )
      expect(screen.getByText('My Company')).toBeInTheDocument()
    })

    it('should render custom element logo', () => {
      const CustomLogo = () => <span data-testid="custom-logo">Logo</span>
      render(
        <RouterWrapper>
          <Header logo={<CustomLogo />} />
        </RouterWrapper>
      )
      expect(screen.getByTestId('custom-logo')).toBeInTheDocument()
    })

    it('should link logo to home by default', () => {
      render(
        <RouterWrapper>
          <Header logo="Company" />
        </RouterWrapper>
      )
      const logoLink = screen.getByLabelText('Home')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should link logo to custom path', () => {
      render(
        <RouterWrapper>
          <Header logo="Company" logoLink="/custom" />
        </RouterWrapper>
      )
      const logoLink = screen.getByLabelText('Home')
      expect(logoLink).toHaveAttribute('href', '/custom')
    })

    it('should not link logo when logoLink is null', () => {
      render(
        <RouterWrapper>
          <Header logo="Company" logoLink={null} />
        </RouterWrapper>
      )
      expect(screen.queryByLabelText('Home')).not.toBeInTheDocument()
      expect(screen.getByText('Company')).toBeInTheDocument()
    })
  })

  // ===========================
  // NAVIGATION
  // ===========================

  describe('Navigation', () => {
    it('should render navigation by default', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      )
      // Navigation component renders nav with role="navigation"
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })

    it('should not render navigation when showNavigation=false', () => {
      render(
        <RouterWrapper>
          <Header showNavigation={false} />
        </RouterWrapper>
      )
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })
  })

  // ===========================
  // CUSTOM CONTENT
  // ===========================

  describe('Custom Content', () => {
    it('should render children content', () => {
      render(
        <RouterWrapper>
          <Header>
            <button>Custom Button</button>
          </Header>
        </RouterWrapper>
      )
      expect(screen.getByRole('button', { name: 'Custom Button' })).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      render(
        <RouterWrapper>
          <Header>
            <button>Button 1</button>
            <button>Button 2</button>
          </Header>
        </RouterWrapper>
      )
      expect(screen.getByRole('button', { name: 'Button 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Button 2' })).toBeInTheDocument()
    })
  })

  // ===========================
  // COMPLEX SCENARIOS
  // ===========================

  describe('Complex Scenarios', () => {
    it('should render complete header with all features', () => {
      render(
        <RouterWrapper>
          <Header
            logo="Acme Corp"
            logoLink="/home"
            sticky={true}
            className="custom-class"
          >
            <button>Search</button>
          </Header>
        </RouterWrapper>
      )

      // Check header
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('header')
      expect(header).toHaveClass('header--sticky')
      expect(header).toHaveClass('custom-class')

      // Check logo
      expect(screen.getByText('Acme Corp')).toBeInTheDocument()
      const logoLink = screen.getByLabelText('Home')
      expect(logoLink).toHaveAttribute('href', '/home')

      // Check navigation
      expect(screen.getByRole('navigation')).toBeInTheDocument()

      // Check custom content
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    })

    it('should handle header without navigation or children', () => {
      render(
        <RouterWrapper>
          <Header logo="Simple" showNavigation={false} />
        </RouterWrapper>
      )

      expect(screen.getByText('Simple')).toBeInTheDocument()
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })
  })

  // ===========================
  // ACCESSIBILITY
  // ===========================

  describe('Accessibility', () => {
    it('should have banner role', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      )
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should have accessible logo link label', () => {
      render(
        <RouterWrapper>
          <Header logo="Company" />
        </RouterWrapper>
      )
      const logoLink = screen.getByLabelText('Home')
      expect(logoLink).toBeInTheDocument()
    })

    it('should support custom props', () => {
      render(
        <RouterWrapper>
          <Header aria-label="Main header" />
        </RouterWrapper>
      )
      const header = screen.getByRole('banner')
      expect(header).toHaveAttribute('aria-label', 'Main header')
    })
  })
})
