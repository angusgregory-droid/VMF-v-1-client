/**
 * About Page
 *
 * Information about the project
 */

import { Card } from '../../components/Card'
import './About.css'

function About() {
  return (
    <div className="container about">
      <h1 className="text-fluid-xl">About StoryLineOS</h1>

      <section className="about__section">
        <h2 className="text-responsive-lg">Project Overview</h2>
        <p className="about__description">
          StoryLineOS is a production-ready component framework built with modern web technologies and best practices.
          Every component is designed to be accessible, responsive, and maintainable.
        </p>
      </section>

      <section className="about__section--spacious">
        <h2 className="text-responsive-lg">Technology Stack</h2>
        <div className="grid grid-cols-1 grid-md-2 about__tech-grid">
          <Card variant="outlined">
            <Card.Header>Frontend</Card.Header>
            <Card.Body>
              <ul className="about__tech-list">
                <li>React 18.3</li>
                <li>React Router 6</li>
                <li>Vite 5.4 (Build tool)</li>
              </ul>
            </Card.Body>
          </Card>
          <Card variant="outlined">
            <Card.Header>Testing</Card.Header>
            <Card.Body>
              <ul className="about__tech-list">
                <li>Vitest</li>
                <li>React Testing Library</li>
                <li>User Event Testing</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </section>

      <section className="about__section--spacious">
        <h2 className="text-responsive-lg">Design Principles</h2>
        <div className="grid grid-cols-1 grid-md-2 about__principles-grid">
          <Card variant="default">
            <Card.Header>DRY (Don't Repeat Yourself)</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                Design tokens and reusable components eliminate duplication
              </p>
            </Card.Body>
          </Card>

          <Card variant="default">
            <Card.Header>Accessibility First</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                WCAG compliant, keyboard navigation, ARIA attributes, screen reader support
              </p>
            </Card.Body>
          </Card>

          <Card variant="default">
            <Card.Header>Mobile-First Responsive</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                All components work beautifully on mobile, tablet, and desktop
              </p>
            </Card.Body>
          </Card>

          <Card variant="default">
            <Card.Header>Single Source of Truth</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                Centralized design tokens make theming and updates effortless
              </p>
            </Card.Body>
          </Card>

          <Card variant="default">
            <Card.Header>Comprehensive Testing</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                Every component has thorough test coverage for reliability
              </p>
            </Card.Body>
          </Card>

          <Card variant="default">
            <Card.Header>Production-Ready</Card.Header>
            <Card.Body>
              <p className="about__principle-text">
                Code follows best practices: modularity, documentation, and maintainability
              </p>
            </Card.Body>
          </Card>
        </div>
      </section>

      <section className="about__section--spacious">
        <h2 className="text-responsive-lg">Architecture</h2>
        <p className="about__description">
          The project follows a monorepo structure with separate client and API directories.
          The frontend uses a component-based architecture with a comprehensive design system,
          responsive utilities, and theme support for easy customization.
        </p>
      </section>

      <section className="about__section--spacious">
        <Card variant="filled">
          <Card.Header>Documentation</Card.Header>
          <Card.Body>
            <p className="about__principle-text">
              Comprehensive documentation is available in the <code>/docs</code> directory, covering:
            </p>
            <ul className="about__doc-list">
              <li>Design system (colors, typography, spacing)</li>
              <li>Responsive design patterns</li>
              <li>Theming system</li>
              <li>Component API references</li>
              <li>Best practices and guidelines</li>
            </ul>
          </Card.Body>
        </Card>
      </section>
    </div>
  )
}

export default About
