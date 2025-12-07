/**
 * Header Component
 *
 * A responsive header component that combines logo and navigation.
 *
 * Features:
 * - Sticky positioning at top
 * - Flexible logo support (text, image, or custom component)
 * - Integrates with Navigation component
 * - Responsive layout
 * - Theme-aware styling
 * - Accessible markup
 *
 * @example
 * <Header logo="My App" />
 *
 * @example
 * <Header
 *   logo={<img src="/logo.svg" alt="Company" />}
 *   logoLink="/"
 * />
 */

import { Link } from '../Link'
import Navigation from '../Navigation'
import './Header.css'

export function Header({
  logo = 'App',
  logoLink = '/',
  showNavigation = true,
  sticky = true,
  className = '',
  children,
  ...props
}) {
  const headerClasses = [
    'header',
    sticky && 'header--sticky',
    className
  ]
    .filter(Boolean)
    .join(' ')

  // Determine if logo is a string (text) or React element
  const isTextLogo = typeof logo === 'string'

  return (
    <header className={headerClasses} {...props}>
      <div className="header__container container">
        <div className="header__brand">
          {logoLink ? (
            <Link
              to={logoLink}
              className="header__logo-link"
              variant="subtle"
              underline="none"
              aria-label="Home"
            >
              {isTextLogo ? (
                <span className="header__logo-text">{logo}</span>
              ) : (
                <div className="header__logo-custom">{logo}</div>
              )}
            </Link>
          ) : (
            <>
              {isTextLogo ? (
                <span className="header__logo-text">{logo}</span>
              ) : (
                <div className="header__logo-custom">{logo}</div>
              )}
            </>
          )}
        </div>

        {showNavigation && (
          <div className="header__nav">
            <Navigation />
          </div>
        )}

        {children && <div className="header__content">{children}</div>}
      </div>
    </header>
  )
}

export default Header
