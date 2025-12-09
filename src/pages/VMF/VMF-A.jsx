import { Fieldset } from '../../components/Fieldset'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Tickbox } from '../../components/Tickbox'
import { Radio } from '../../components/Radio'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFA() {
  return (
    <div className="container vmf">
      <h1 className="vmf__title">VMF-A: Form Elements</h1>
      <p className="vmf__subtitle">Button, Input, Select, Tickbox, Radio</p>

      <VMFNavbar />

      <Fieldset variant="outlined">
        <Fieldset.Legend>Form Components Showcase</Fieldset.Legend>
        <Fieldset.Content>
          <div className="vmf__split-layout">
            <div className="vmf__split-left">
              <h3>Button Variants</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="primary" disabled>Disabled Button</Button>
              </div>

              <h3 style={{ marginTop: '24px' }}>Radio Buttons</h3>
              <Radio name="option" value="1" label="Option 1" />
              <Radio name="option" value="2" label="Option 2" />
              <Radio name="option" value="3" label="Option 3" />
            </div>

            <div className="vmf__split-right">
              <h3>Input Fields</h3>
              <Input type="text" placeholder="Text input" />
              <Input type="email" placeholder="Email input" />
              <Input type="password" placeholder="Password input" />
              <Input type="text" placeholder="Disabled input" disabled />

              <h3 style={{ marginTop: '24px' }}>Select Dropdown</h3>
              <Select>
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>

              <h3 style={{ marginTop: '24px' }}>Checkboxes</h3>
              <Tickbox label="Accept terms and conditions" />
              <Tickbox label="Subscribe to newsletter" />
              <Tickbox label="Enable notifications" />
              <Tickbox label="Disabled checkbox" disabled />
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFA
