import { useState } from 'react'
import { Button } from './components/Button'

function App() {
  const [loading, setLoading] = useState(false)

  const handleAsyncAction = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1>Button Component Demo</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Variants</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>States</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button disabled>Disabled</Button>
          <Button loading={loading} onClick={handleAsyncAction}>
            {loading ? 'Loading...' : 'Click to Load'}
          </Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Double Outline</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button variant="outline" doubleOutline>Outline Double</Button>
          <Button variant="primary" doubleOutline>Primary Double</Button>
          <Button variant="secondary" doubleOutline>Secondary Double</Button>
          <Button variant="danger" doubleOutline>Danger Double</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Square (No Border Radius)</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button variant="primary" square>Square Primary</Button>
          <Button variant="outline" square>Square Outline</Button>
          <Button variant="danger" square>Square Danger</Button>
          <Button variant="outline" square doubleOutline>Square Double</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Full Width</h2>
        <div style={{ marginTop: '1rem' }}>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>
    </div>
  )
}

export default App
