/**
 * Stepper Component
 *
 * A professional, accessible stepper for multi-step workflows with two variants:
 * - horizontal: Steps displayed horizontally (switches to vertical on mobile)
 * - vertical: Steps displayed vertically on all screen sizes
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - StepperPanel components for each step
 * @param {number} [props.defaultActiveStep=0] - Initial active step index (0-based)
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal'] - Layout orientation
 * @param {Function} [props.prevCallback] - Callback when navigating backward: (currentIndex) => void
 * @param {Function} [props.nextCallback] - Callback when navigating forward: (currentIndex) => void
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props...rest] - Additional props passed to the container div
 * @returns {JSX.Element} Stepper component
 *
 * @example
 * // Basic horizontal stepper
 * <Stepper defaultActiveStep={0} orientation="horizontal">
 *   <Stepper.Panel>Step 1 content</Stepper.Panel>
 *   <Stepper.Panel>Step 2 content</Stepper.Panel>
 *   <Stepper.Panel>Step 3 content</Stepper.Panel>
 * </Stepper>
 *
 * @example
 * // Stepper with navigation callbacks
 * <Stepper
 *   defaultActiveStep={0}
 *   prevCallback={(currentIndex) => console.log('Going back from', currentIndex)}
 *   nextCallback={(currentIndex) => console.log('Going forward from', currentIndex)}
 * >
 *   <Stepper.Panel>Step 1</Stepper.Panel>
 *   <Stepper.Panel>Step 2</Stepper.Panel>
 * </Stepper>
 */

import { useState, createContext, useContext, Children, forwardRef, useImperativeHandle } from 'react'
import './Stepper.css'

// Context for sharing state between Stepper and StepperPanel
const StepperContext = createContext(null)

// Main Stepper Component
export const Stepper = forwardRef(function Stepper({
  children,
  defaultActiveStep = 0,
  orientation = 'horizontal',
  prevCallback,
  nextCallback,
  className = '',
  ...props
}, ref) {
  // State: activeStep (current step index), completedSteps (Set of completed indices)
  const [activeStep, setActiveStep] = useState(defaultActiveStep)
  const [completedSteps, setCompletedSteps] = useState(
    new Set(Array.from({ length: defaultActiveStep }, (_, i) => i))
  )

  // Calculate total steps from children
  const totalSteps = Children.count(children)

  // Navigation handler
  const goToStep = (index) => {
    if (index < 0 || index >= totalSteps) return

    // Only allow navigation to completed steps or current step
    if (!completedSteps.has(index) && index !== activeStep) return

    // Determine if going forward or backward
    const isGoingBackward = index < activeStep

    if (isGoingBackward) {
      // Can always go back
      prevCallback?.(activeStep)
      setActiveStep(index)
    } else if (index > activeStep && completedSteps.has(index)) {
      // Can only go forward if step is already completed
      nextCallback?.(activeStep)
      setActiveStep(index)
    }
    // If clicking current step, do nothing
  }

  // Mark a step as complete
  const markStepComplete = (index) => {
    if (index >= 0 && index < totalSteps) {
      setCompletedSteps((prev) => new Set([...prev, index]))
    }
  }

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    goToStep,
    markStepComplete,
    getActiveStep: () => activeStep,
    getCompletedSteps: () => Array.from(completedSteps)
  }))

  const contextValue = {
    activeStep,
    completedSteps,
    totalSteps,
    goToStep,
    markStepComplete,
    orientation,
    prevCallback,
    nextCallback
  }

  const stepperClasses = [
    'stepper',
    `stepper--${orientation}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        className={stepperClasses}
        role="navigation"
        aria-label="Progress steps"
        {...props}
      >
        <div className="stepper__track">
          {Children.map(children, (child, index) => (
            <StepperIndicator
              key={index}
              index={index}
              isActive={index === activeStep}
              isCompleted={completedSteps.has(index)}
              isClickable={completedSteps.has(index) || index === activeStep}
              isLast={index === totalSteps - 1}
            />
          ))}
        </div>
        <div className="stepper__content">
          {Children.map(children, (child, index) =>
            index === activeStep ? child : null
          )}
        </div>
      </div>
    </StepperContext.Provider>
  )
})

Stepper.displayName = 'Stepper'

// Step Indicator Component (internal)
function StepperIndicator({ index, isActive, isCompleted, isClickable, isLast }) {
  const { goToStep } = useContext(StepperContext)

  const handleClick = () => {
    if (isClickable) {
      goToStep(index)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
      e.preventDefault()
      goToStep(index)
    }
  }

  const indicatorClasses = [
    'stepper__indicator',
    isActive && 'stepper__indicator--active',
    isCompleted && 'stepper__indicator--completed',
    isClickable && 'stepper__indicator--clickable'
  ].filter(Boolean).join(' ')

  return (
    <>
      <div className="stepper__step">
        <button
          type="button"
          className={indicatorClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={!isClickable}
          aria-current={isActive ? 'step' : undefined}
          aria-label={`Step ${index + 1}${isCompleted ? ' (completed)' : ''}${isActive ? ' (current)' : ''}`}
          tabIndex={isClickable ? 0 : -1}
        >
          <span className="stepper__indicator-number">
            {isCompleted ? (
              <svg className="stepper__check-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.5 3.5L6 11l-3.5-3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              index + 1
            )}
          </span>
        </button>
      </div>
      {!isLast && (
        <div
          className={`stepper__connector ${isCompleted ? 'stepper__connector--completed' : ''}`}
          aria-hidden="true"
        />
      )}
    </>
  )
}

// StepperPanel Sub-component
Stepper.Panel = function StepperPanel({ children, className = '', ...props }) {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('Stepper.Panel must be used within Stepper')
  }

  const panelClasses = ['stepper__panel', className].filter(Boolean).join(' ')

  return (
    <div
      className={panelClasses}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  )
}

export default Stepper
