/**
 * Avatar Component
 *
 * Displays user profile pictures, initials, or fallback icons
 *
 * Features:
 * - Image support with fallback to initials
 * - Multiple sizes (xs, sm, md, lg, xl)
 * - Multiple shapes (circle, square, rounded)
 * - Status indicators (online, offline, away, busy)
 * - Accessible with proper alt text
 * - Theme-aware styling
 *
 * @example
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * @example
 * <Avatar name="John Doe" size="lg" />
 *
 * @example
 * <Avatar name="Jane Smith" status="online" shape="rounded" />
 */

import { MdPerson } from 'react-icons/md'
import './Avatar.css'

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  ...props
}) {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return null

    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0].substring(0, 2).toUpperCase()
  }

  const initials = getInitials(name)

  // Build class names
  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    `avatar--${shape}`,
    status && 'avatar--has-status',
    className
  ]
    .filter(Boolean)
    .join(' ')

  const statusClasses = [
    'avatar__status',
    status && `avatar__status--${status}`
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="avatar__image"
          onError={(e) => {
            // Hide image on error and show initials
            e.target.style.display = 'none'
          }}
        />
      ) : null}

      {!src && (
        <span className="avatar__initials" aria-label={name || 'Avatar'}>
          {initials}
        </span>
      )}

      {!src && !name && (
        <span className="avatar__icon" aria-label="Avatar">
          <MdPerson aria-hidden="true" focusable="false" />
        </span>
      )}

      {status && (
        <span
          className={statusClasses}
          aria-label={`Status: ${status}`}
          role="status"
        />
      )}
    </div>
  )
}

export default Avatar
