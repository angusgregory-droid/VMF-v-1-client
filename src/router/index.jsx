/**
 * Router Configuration
 *
 * Centralized routing configuration with lazy-loaded pages
 * All routes use React.lazy() for code splitting and better performance
 */

import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

// Lazy-loaded page components
const Home = lazy(() => import('../pages/Home'))
const Components = lazy(() => import('../pages/Components'))
const About = lazy(() => import('../pages/About'))

/**
 * Loading Fallback Component
 * Shown while lazy-loaded routes are loading
 */
function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--color-text-secondary)'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-primary-500)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto'
          }}
        ></div>
        <p style={{ marginTop: 'var(--spacing-md)' }}>Loading...</p>
      </div>
    </div>
  )
}

/**
 * Root Layout
 * Wraps all routes with navigation and suspense boundary
 */
function RootLayout() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', to: '/components' },
        { label: 'Documentation', to: '/about' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/about' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Components', to: '/components' },
        { label: 'GitHub', href: 'https://github.com', external: true, openInNewTab: true }
      ]
    }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header logo="StoryLineOS" />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer sections={footerSections} copyright="StoryLineOS" />
    </div>
  )
}

/**
 * Router Configuration
 * Uses createBrowserRouter for better type safety and future features
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'components',
        element: <Components />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

// Add loading spinner animation to global styles
const style = document.createElement('style')
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
document.head.appendChild(style)
