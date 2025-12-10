import { useState } from 'react'
import { Fieldset } from '../../components/Fieldset'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Tickbox } from '../../components/Tickbox'
import { Radio } from '../../components/Radio'
import { VMFNavbar } from '../../components/VMFNavbar'
import './VMF.css'

function VMFA() {
  const [radioValue, setRadioValue] = useState('1')
  const [selectValue, setSelectValue] = useState('')
  const [name, setName] = useState('')
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    newsletter: false,
    notifications: false,
  })

  const selectOptions = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Development' },
  ]

  const handleCheckboxChange = (key) => (e) => {
    setCheckboxes((prev) => ({ ...prev, [key]: e.target.checked }))
  }

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
              <div className="vmf__section-block">
                <h3 className="vmf__section-heading">Button Variants</h3>
                <div className="vmf__stack">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="primary" disabled>Disabled Button</Button>
                </div>
              </div>

              <div className="vmf__section-block">
                <h3 className="vmf__section-heading">Radio Buttons</h3>
                <div className="vmf__stack">
                  <Radio
                    name="vmf-radio"
                    value="1"
                    label="Option 1"
                    checked={radioValue === '1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    name="vmf-radio"
                    value="2"
                    label="Option 2"
                    checked={radioValue === '2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    name="vmf-radio"
                    value="3"
                    label="Option 3"
                    checked={radioValue === '3'}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <p className="vmf__helper-inline">Selected: {radioValue}</p>
                </div>
              </div>
            </div>

            <div className="vmf__split-right">
              <div className="vmf__section-block">
                <h3 className="vmf__section-heading">Input Fields</h3>
                <div className="vmf__stack">
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="vmf-name"
                  />
                  <Input label="Email" placeholder="email@example.com" type="email" id="vmf-email" />
                  <Input label="Password" placeholder="••••••••" type="password" id="vmf-password" />
                  <Input label="Disabled" value="Read-only" disabled id="vmf-disabled" />
                  <p className="vmf__helper-inline">Typed name: {name || '—'}</p>
                </div>
              </div>

              <div className="vmf__section-block">
                <h3 className="vmf__section-heading">Select Dropdown</h3>
                <div className="vmf__stack">
                  <Select
                    id="vmf-select"
                    label="Environment"
                    placeholder="Choose environment"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    options={selectOptions}
                    helperText={`Selected: ${selectValue || 'None'}`}
                  />
                </div>
              </div>

              <div className="vmf__section-block">
                <h3 className="vmf__section-heading">Checkboxes</h3>
                <div className="vmf__stack">
                  <Tickbox
                    label="Accept terms and conditions"
                    checked={checkboxes.terms}
                    onChange={handleCheckboxChange('terms')}
                  />
                  <Tickbox
                    label="Subscribe to newsletter"
                    checked={checkboxes.newsletter}
                    onChange={handleCheckboxChange('newsletter')}
                  />
                  <Tickbox
                    label="Enable notifications"
                    checked={checkboxes.notifications}
                    onChange={handleCheckboxChange('notifications')}
                  />
                  <Tickbox label="Disabled checkbox" disabled />
                  <p className="vmf__helper-inline">
                    Status: {checkboxes.terms ? 'Terms accepted' : 'Terms not accepted'} •{' '}
                    {checkboxes.newsletter ? 'Subscribed' : 'Not subscribed'} •{' '}
                    {checkboxes.notifications ? 'Notifications on' : 'Notifications off'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fieldset.Content>
      </Fieldset>
    </div>
  )
}

export default VMFA
