import { Fieldset } from '../../components/Fieldset'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { Spinner } from '../../components/Spinner'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFB() {
  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-B: Display Elements</h1>
      <p className="vmf__subtitle">Card, Avatar, Spinner</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Display Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>Avatar Sizes</h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar size="sm" initials="SM" />
                <Avatar size="md" initials="MD" />
                <Avatar size="lg" initials="LG" />
              </div>

              <h3>Avatar with Images</h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar size="md" src="https://via.placeholder.com/150" alt="User 1" />
                <Avatar size="md" initials="JD" />
                <Avatar size="md" initials="AB" />
              </div>

              <h3 style={{ marginTop: '24px' }}>Loading Spinners</h3>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>

            <div className="vmf__split-right">
              <h3>Card Components</h3>
              <Card>
                <Card.Header>
                  <h4>Card Title</h4>
                </Card.Header>
                <Card.Body>
                  <p>This is a basic card with header and content sections. Cards are great for organizing related information.</p>
                </Card.Body>
              </Card>

              <Card style={{ marginTop: '16px' }}>
                <Card.Header>
                  <h4>Card with Footer</h4>
                </Card.Header>
                <Card.Body>
                  <p>This card includes a footer section for actions or additional information.</p>
                </Card.Body>
                <Card.Footer>
                  <small>Last updated: Today</small>
                </Card.Footer>
              </Card>

              <Card variant="outlined" style={{ marginTop: '16px' }}>
                <Card.Body>
                  <p>This is an outlined card variant without a header.</p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFB
