import { Fieldset } from '../../components/Fieldset'
import { HorizontalScroll } from '../../components/HorizontalScroll'
import { Link } from '../../components/Link'
import { useToaster } from '../../components/Toaster'
import { Button } from '../../components/Button'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFF() {
  const { addToast } = useToaster()

  const showToast = (type) => {
    const toastMessages = {
      success: { title: 'Success!', description: 'Operation completed successfully' },
      info: { title: 'Information', description: 'Here is some information for you' },
      warning: { title: 'Warning', description: 'Please be careful with this action' },
      error: { title: 'Error', description: 'Something went wrong' }
    }

    addToast({ ...toastMessages[type], variant: type })
  }

  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-F: Utility Elements</h1>
      <p className="vmf__subtitle">HorizontalScroll, Link, Toaster</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Utility Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>Link Components</h3>
              <p>Various link styles and variants:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <Link to="/" variant="primary">Primary Link</Link>
                <Link to="/" variant="secondary">Secondary Link</Link>
                <Link to="/" variant="subtle">Subtle Link</Link>
                <Link to="/" variant="danger">Danger Link</Link>
              </div>

              <h3 style={{ marginTop: '24px' }}>External Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="https://example.com" openInNewTab>
                  External Link (New Tab)
                </Link>
                <Link href="https://example.com" underline="always">
                  Always Underlined Link
                </Link>
                <Link href="https://example.com" underline="none">
                  No Underline Link
                </Link>
              </div>
            </div>

            <div className="vmf__split-right">
              <h3>Horizontal Scroll</h3>
              <p>Scrollable content container for horizontal layouts:</p>
              <HorizontalScroll style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', padding: '8px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div
                      key={num}
                      style={{
                        minWidth: '150px',
                        height: '100px',
                        backgroundColor: 'var(--color-primary-500)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </HorizontalScroll>

              <h3 style={{ marginTop: '24px' }}>Toaster Notifications</h3>
              <p>Display feedback messages to users:</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => showToast('success')}>
                  Success Toast
                </Button>
                <Button variant="secondary" onClick={() => showToast('info')}>
                  Info Toast
                </Button>
                <Button variant="outline" onClick={() => showToast('warning')}>
                  Warning Toast
                </Button>
                <Button variant="danger" onClick={() => showToast('error')}>
                  Error Toast
                </Button>
              </div>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Click the buttons above to see toast notifications appear in the corner of the screen.
              </p>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFF
