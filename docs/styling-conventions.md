# Styling Conventions

This document outlines the styling conventions and best practices used throughout the StoryLineOS application.

## Overview

The application follows a **CSS-first** approach with minimal inline styles. All styling is done through CSS classes with proper separation of concerns.

## Inline Style Policy

**Rule**: Inline styles are **NOT allowed** except for one specific case:

### ✅ Allowed: Component Props
Inline styles are ONLY acceptable when they are **props passed down from a component** for dynamic, component-specific values.

**Example (Allowed)**:
```jsx
// HorizontalScroll component uses inline style for dynamic gap value
<div className="h-scroll__track" style={{ gap: gapValue }}>
  {children}
</div>

// Card sizing props in HorizontalScroll children
<Card style={{ maxWidth: '280px', flex: '0 0 auto' }}>
  <Card.Header>Title</Card.Header>
</Card>
```

### ❌ Not Allowed: Arbitrary Inline Styles
```jsx
// ❌ WRONG - arbitrary inline styles
<div style={{ marginTop: '2rem', display: 'flex' }}>
  <p style={{ color: 'var(--color-text-secondary)' }}>Text</p>
</div>

// ✅ CORRECT - use CSS classes
<div className="section">
  <p className="text-secondary">Text</p>
</div>
```

## CSS Organization

### Page-Level Styles
Each page has its own CSS file with BEM naming:

```
src/pages/
├── Home/
│   ├── Home.jsx
│   └── Home.css          # Page-specific styles
├── About/
│   ├── About.jsx
│   └── About.css
└── Components/
    ├── Components.jsx
    └── Components.css
```

### Component-Level Styles
Components include their styles and use BEM naming:

```
src/components/Card/
├── Card.jsx
├── Card.css              # Component styles
└── Card.test.jsx
```

### Router Styles
Router-specific layouts have dedicated CSS:

```
src/router/
├── index.jsx
└── router.css            # Layout and loading fallback styles
```

## BEM Naming Convention

We use BEM (Block Element Modifier) for class naming:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--elevated { }
.card--outlined { }
```

**Example from Home page**:
```css
.home { }                          /* Block */
.home__header { }                  /* Element */
.home__subtitle { }                /* Element */
.home__section { }                 /* Element */
.home__cta-buttons { }             /* Element */
```

## Design Tokens

All spacing, colors, typography, and other design values come from CSS custom properties:

```css
/* ✅ CORRECT - use design tokens */
.button {
  padding: var(--spacing-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-md);
}

/* ❌ WRONG - hardcoded values */
.button {
  padding: 8px;
  color: #333;
  font-size: 16px;
  border-radius: 4px;
}
```

## Component Usage

### Prefer Existing Components
Always use existing components instead of creating custom markup with inline styles:

```jsx
// ❌ WRONG - custom div with inline styles
<div style={{
  padding: 'var(--spacing-lg)',
  backgroundColor: 'var(--color-background-secondary)',
  borderRadius: 'var(--border-radius-lg)'
}}>
  <h3>Title</h3>
  <p>Content</p>
</div>

// ✅ CORRECT - use Card component
<Card variant="filled">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## Layout Patterns

### Flexbox Layouts
Use CSS classes for flex layouts:

```css
.flex-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### Grid Layouts
Use CSS classes for grid layouts:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid--narrow {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
```

## Sticky Header Implementation

The Header component uses `position: sticky` with proper overflow handling:

```css
/* Header CSS */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  background-color: var(--color-surface);
}

/* Router Layout CSS */
.root-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* No overflow here - would break sticky positioning */
}

.root-layout__main {
  flex: 1;
  overflow-x: hidden;  /* Only on main content, not root */
}
```

**Important**: Parent elements with `overflow: hidden` break `position: sticky`. Only apply overflow to child elements below the sticky header.

## File Structure Summary

```
src/
├── styles/
│   ├── index.css              # Global styles & imports
│   ├── reset.css              # CSS reset
│   ├── design-system.css      # Design tokens (colors, spacing, etc.)
│   ├── typography.css         # Text styles
│   └── responsive.css         # Responsive utilities
├── pages/
│   └── [PageName]/
│       ├── [PageName].jsx
│       └── [PageName].css     # Page-specific styles (BEM)
├── components/
│   └── [ComponentName]/
│       ├── [ComponentName].jsx
│       └── [ComponentName].css  # Component styles (BEM)
└── router/
    ├── index.jsx
    └── router.css             # Router layout styles
```

## Migration Notes

### Recent Refactoring (December 2024)
- ✅ Removed 200+ inline styles from Components page (88% reduction)
- ✅ All pages now use CSS classes with BEM naming
- ✅ Home, About, and Components pages now use Card components
- ✅ Router LoadingFallback refactored to use CSS classes
- ✅ Fixed sticky header with proper overflow handling
- ✅ HorizontalScroll simplified to remove navigation buttons

## Best Practices

1. **Always use CSS classes** - Never use inline styles except for component props
2. **Use existing components** - Card, Button, Link, etc. instead of custom markup
3. **Follow BEM naming** - Block__element--modifier
4. **Use design tokens** - Always use CSS custom properties for values
5. **Keep CSS modular** - Each page/component has its own CSS file
6. **Semantic class names** - Names should describe purpose, not appearance
7. **Responsive by default** - Use mobile-first approach with design tokens

## Resources

- [CSS Design System](./design-system/css-design-system.md)
- [Responsive Design](./design-system/responsive-design.md)
- [Component Documentation](./components/)
