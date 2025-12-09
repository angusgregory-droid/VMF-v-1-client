import { useState } from 'react'
import { Fieldset } from '../../components/Fieldset'
import { Accordion } from '../../components/Accordion'
import { Dialog } from '../../components/Dialog'
import { Tooltip } from '../../components/Tooltip'
import { Button } from '../../components/Button'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFC() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-C: Interactive Elements</h1>
      <p className="vmf__subtitle">Accordion, Dialog, Tooltip</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Interactive Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>Accordion</h3>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>Section 1</Accordion.Header>
                  <Accordion.Content>
                    <p>This is the content of section 1. Accordions are great for organizing collapsible content.</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Section 2</Accordion.Header>
                  <Accordion.Content>
                    <p>This is the content of section 2. Click the headers to expand or collapse sections.</p>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                  <Accordion.Header>Section 3</Accordion.Header>
                  <Accordion.Content>
                    <p>This is the content of section 3. Multiple sections can be open at the same time.</p>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="vmf__split-right">
              <h3>Dialog Modal</h3>
              <p>Dialogs are useful for displaying important information or forms that require user attention.</p>
              <Button variant="primary" onClick={() => setIsDialogOpen(true)}>
                Open Dialog
              </Button>

              <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <Dialog.Header>
                  <h3>Example Dialog</h3>
                </Dialog.Header>
                <Dialog.Body>
                  <p>This is a modal dialog. It overlays the content and requires user interaction to close.</p>
                  <p>You can include any content here, such as forms, messages, or confirmations.</p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsDialogOpen(false)}>
                    Confirm
                  </Button>
                </Dialog.Footer>
              </Dialog>

              <h3 style={{ marginTop: '24px' }}>Tooltips</h3>
              <p>Hover over the elements below to see tooltips:</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Tooltip content="This is a tooltip">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
                <Tooltip content="Tooltips provide helpful hints">
                  <Button variant="outline">Hover me too</Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFC
