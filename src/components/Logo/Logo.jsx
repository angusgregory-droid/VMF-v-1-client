/**
 * Logo Component
 *
 * StoryLineOS brand logo component
 *
 * @example
 * <Logo />
 * <Logo size="large" />
 */

import './Logo.css'

export function Logo({ size = 'medium', className = '', ...props }) {
  const logoClasses = ['logo', `logo--${size}`, className].filter(Boolean).join(' ')

  return (
    <div className={logoClasses} {...props}>
      <img
        src="https://static.wixstatic.com/media/4a1576_210265fd271a43a68711239c2d20098d~mv2.png/v1/fill/w_435,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design%20(1).png"
        alt="StoryLineOS Logo"
        className="logo__image"
      />
    </div>
  )
}

export default Logo
