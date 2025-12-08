# Horizontal Scroll Component

A horizontally scrollable container with snap alignment and optional navigation buttons.

## Features

- ✅ **Horizontal Overflow**: Smooth horizontal scrolling for any children
- ✅ **Navigation Buttons**: Optional prev/next controls with disabled states
- ✅ **Snap Support**: Scroll-snap alignment for tidy rails
- ✅ **Responsive**: Buttons hide on mobile; touch-friendly scrolling
- ✅ **Design Tokens**: Uses spacing, colors, borders, and shadows from the design system
- ✅ **Accessible**: Labeled region and focusable controls

## Basic Usage

```jsx
import { HorizontalScroll } from '@/components/HorizontalScroll'
import { Card } from '@/components/Card'

function FeatureRail() {
  return (
    <HorizontalScroll ariaLabel="Feature rail">
      {[1, 2, 3].map((n) => (
        <Card key={n} variant="outlined" style={{ minWidth: '240px', flex: '0 0 auto' }}>
          <Card.Header>Item {n}</Card.Header>
          <Card.Body>Scrollable content {n}</Card.Body>
        </Card>
      ))}
    </HorizontalScroll>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spacing between items |
| `snap` | `boolean` | `true` | Enable CSS scroll-snap alignment |
| `showButtons` | `boolean` | `true` | Show prev/next buttons (hidden on mobile) |
| `scrollStep` | `number` | `320` | Pixels to scroll per button click |
| `ariaLabel` | `string` | `'Horizontal content'` | Accessible label for the scroll region |
| `className` | `string` | `''` | Additional wrapper classes |
| `...props` | `div` | - | Standard div attributes |

## Best Practices

- Set a minimum width on child items (e.g., `minWidth: '240px'`) so snapping feels consistent.
- Use `ariaLabel` to describe the content (e.g., “Product carousel”).
- Keep button labels short; they already announce direction (`Scroll left/right`).
- Reduce `scrollStep` for compact items or increase for larger cards.
- Leave `snap` enabled for rails; disable if you need freeform scrolling.

## Related Components

- **Card**: Commonly used as children in horizontal rails.
- **Tooltip**: Add context to actions within scrolled items.
- **Toaster**: Provide feedback for actions triggered from items in the rail.
