/**
 * Components Page
 *
 * Showcase of all available components
 */

import { useState } from 'react'
import { Button } from '../../components/Button'
import { Link } from '../../components/Link'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'

function Components() {
  const [loading, setLoading] = useState(false)

  const handleAsyncAction = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 className="text-fluid-xl">Component Showcase</h1>
      <p className="text-responsive-base" style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
        Production-ready, accessible components for building modern web applications
      </p>

      <section style={{ marginTop: '3rem' }}>
        <h2 className="text-responsive-lg">Button Component</h2>

        <div style={{ marginTop: '2rem' }}>
          <h3>Variants</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Sizes</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>States</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={handleAsyncAction}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Double Outline</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Button variant="outline" doubleOutline>Outline Double</Button>
            <Button variant="primary" doubleOutline>Primary Double</Button>
            <Button variant="secondary" doubleOutline>Secondary Double</Button>
            <Button variant="danger" doubleOutline>Danger Double</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Square (No Border Radius)</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Button variant="primary" square>Square Primary</Button>
            <Button variant="outline" square>Square Outline</Button>
            <Button variant="danger" square>Square Danger</Button>
            <Button variant="outline" square doubleOutline>Square Double</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Full Width</h3>
          <div style={{ marginTop: '1rem' }}>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 className="text-responsive-lg">Link Component</h2>

        <div style={{ marginTop: '2rem' }}>
          <h3>Variants</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link to="/about" variant="primary">Primary Link</Link>
            <Link to="/about" variant="secondary">Secondary Link</Link>
            <Link to="/about" variant="subtle">Subtle Link</Link>
            <Link to="/about" variant="danger">Danger Link</Link>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Underline Styles</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link to="/about" underline="none">No Underline</Link>
            <Link to="/about" underline="hover">Hover Underline</Link>
            <Link to="/about" underline="always">Always Underlined</Link>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>External Links</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="https://react.dev">React Docs</Link>
            <Link href="https://vitejs.dev" openInNewTab>Vite Docs</Link>
            <Link href="https://github.com" variant="secondary" openInNewTab>GitHub</Link>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>States</h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link to="/about">Normal Link</Link>
            <Link to="/about" disabled>Disabled Link</Link>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>In Paragraphs</h3>
          <p style={{ marginTop: '1rem', maxWidth: '600px', lineHeight: 'var(--line-height-relaxed)' }}>
            Links in paragraphs automatically get subtle underlines for better readability.
            For example, check out the <Link to="/components">components page</Link> or
            read our <Link to="/about">about section</Link> to learn more.
          </p>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 className="text-responsive-lg">Card Component</h2>

        <div style={{ marginTop: '2rem' }}>
          <h3>Variants</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <Card variant="default">
              <Card.Header>Default Card</Card.Header>
              <Card.Body>Basic bordered card with clean design.</Card.Body>
            </Card>

            <Card variant="outlined">
              <Card.Header>Outlined Card</Card.Header>
              <Card.Body>Emphasized 2px border for prominence.</Card.Body>
            </Card>

            <Card variant="elevated">
              <Card.Header>Elevated Card</Card.Header>
              <Card.Body>Professional shadow effect for depth.</Card.Body>
            </Card>

            <Card variant="filled">
              <Card.Header>Filled Card</Card.Header>
              <Card.Body>Subtle background color variant.</Card.Body>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Interactive Cards</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <Card hoverable variant="elevated">
              <Card.Header>Hoverable Card</Card.Header>
              <Card.Body>Hover me! I lift up with a smooth animation.</Card.Body>
            </Card>

            <Card clickable onClick={() => alert('Card clicked!')}>
              <Card.Header>Clickable Card</Card.Header>
              <Card.Body>Click me! The entire card is interactive.</Card.Body>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Corner Styles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <Card rounded variant="elevated">
              <Card.Header>Rounded Corners</Card.Header>
              <Card.Body>Smooth, modern rounded corners (default).</Card.Body>
            </Card>

            <Card rounded={false} variant="elevated">
              <Card.Header>Square Corners</Card.Header>
              <Card.Body>Sharp, minimal square corners.</Card.Body>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Card with Image</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <Card variant="elevated" hoverable>
              <Card.Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                alt="Mountain landscape"
              />
              <Card.Header>Mountain Adventure</Card.Header>
              <Card.Body>
                Explore breathtaking mountain landscapes and discover hidden trails.
              </Card.Body>
              <Card.Footer>
                <Button size="sm">Learn More</Button>
                <Button size="sm" variant="outline">Share</Button>
              </Card.Footer>
            </Card>

            <Card variant="elevated" hoverable>
              <Card.Image
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=200&fit=crop"
                alt="Night sky"
              />
              <Card.Header>Stargazing Guide</Card.Header>
              <Card.Body>
                Perfect spots and times for observing the night sky.
              </Card.Body>
              <Card.Footer>
                <Button size="sm">Read Guide</Button>
                <Button size="sm" variant="outline">Bookmark</Button>
              </Card.Footer>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>User Profile Cards</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <Card variant="outlined">
              <Card.Body>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar name="Sarah Johnson" size="lg" status="online" />
                  <div>
                    <h4 style={{ margin: 0 }}>Sarah Johnson</h4>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      Product Designer
                    </p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="outline" fullWidth>View Profile</Button>
              </Card.Footer>
            </Card>

            <Card variant="outlined">
              <Card.Body>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar name="Michael Chen" size="lg" status="away" shape="rounded" />
                  <div>
                    <h4 style={{ margin: 0 }}>Michael Chen</h4>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      Software Engineer
                    </p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="outline" fullWidth>View Profile</Button>
              </Card.Footer>
            </Card>

            <Card variant="outlined">
              <Card.Body>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar name="Emily Rodriguez" size="lg" status="busy" />
                  <div>
                    <h4 style={{ margin: 0 }}>Emily Rodriguez</h4>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      UX Researcher
                    </p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="outline" fullWidth>View Profile</Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '4rem', padding: 'var(--spacing-xl)', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-lg)' }}>
        <h2 className="text-responsive-lg">Coming Soon</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
          More components are being built following the same production-ready standards:
        </p>
        <ul style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
          <li>Input fields & Forms</li>
          <li>Modals & Dialogs</li>
          <li>Tables & Data Grids</li>
          <li>Tooltips & Popovers</li>
          <li>And more...</li>
        </ul>
      </section>
    </div>
  )
}

export default Components
