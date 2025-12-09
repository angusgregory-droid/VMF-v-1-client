import { Fieldset } from '../../components/Fieldset'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Navigation from '../../components/Navigation'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFD() {
  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-D: Layout Elements</h1>
      <p className="vmf__subtitle">Header, Footer, Navigation</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Layout Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>Navigation Component</h3>
              <p>The navigation component provides responsive menu functionality:</p>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', padding: '8px', marginTop: '12px' }}>
                <Navigation isOpen={true} />
              </div>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Navigation includes active link highlighting and responsive mobile menu support.
              </p>
            </div>

            <div className="vmf__split-right">
              <h3>Header Component</h3>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', marginBottom: '24px' }}>
                <Header />
              </div>

              <h3>Footer Component</h3>
              <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                <Footer />
              </div>

              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Header and Footer components provide consistent branding and navigation across the application.
              </p>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFD
