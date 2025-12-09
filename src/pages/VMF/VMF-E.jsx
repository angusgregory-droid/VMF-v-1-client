import { Fieldset } from '../../components/Fieldset'
import { DateTime } from '../../components/DateTime'
import { Typewriter } from '../../components/Typewriter'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFE() {
  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-E: Content Elements</h1>
      <p className="vmf__subtitle">DateTime, Typewriter</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Content Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>DateTime Component</h3>
              <p>Display dates and times in various formats:</p>

              <div style={{ marginTop: '16px' }}>
                <p><strong>Current Date & Time:</strong></p>
                <DateTime />
              </div>

              <div style={{ marginTop: '16px' }}>
                <p><strong>Custom Date:</strong></p>
                <DateTime date={new Date('2024-01-01')} />
              </div>

              <div style={{ marginTop: '16px' }}>
                <p><strong>Relative Time:</strong></p>
                <DateTime date={new Date()} format="relative" />
              </div>

              <div style={{ marginTop: '16px' }}>
                <p><strong>Time Only:</strong></p>
                <DateTime format="time" />
              </div>
            </div>

            <div className="vmf__split-right">
              <h3>Typewriter Effect</h3>
              <p>Create animated typing effects for engaging text displays:</p>

              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '4px'
              }}>
                <Typewriter
                  text="Welcome to the VMF Dashboard! This is a typewriter effect component."
                  speed={50}
                />
              </div>

              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '4px'
              }}>
                <Typewriter
                  text="This text types slower for a different effect..."
                  speed={100}
                />
              </div>

              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: 'var(--color-background-secondary)',
                borderRadius: '4px'
              }}>
                <Typewriter
                  text="And this one types very quickly!"
                  speed={25}
                />
              </div>

              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                The typewriter effect is perfect for landing pages, announcements, or any content that needs to capture attention.
              </p>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFE
