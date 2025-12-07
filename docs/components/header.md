# Header Component

A responsive header component that combines logo and navigation.

## Features

- ✅ **Sticky Positioning**: Stays at top while scrolling (optional)
- ✅ **Flexible Logo**: Text, image, or custom React element
- ✅ **Navigation Integration**: Automatically includes Navigation component
- ✅ **Custom Content**: Add extra elements (search, user menu, etc.)
- ✅ **Responsive**: Adapts to all screen sizes
- ✅ **Theme Support**: Works with all color schemes
- ✅ **Accessible**: Proper semantic HTML and ARIA

## Basic Usage

```jsx
import { Header } from '@/components/Header'

function App() {
  return (
    <>
      <Header logo="My App" />
      <main>{/* Your content */}</main>
    </>
  )
}
```

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string \| ReactNode` | `'App'` | Logo text or custom element |
| `logoLink` | `string \| null` | `'/'` | Logo link destination (null = no link) |
| `showNavigation` | `boolean` | `true` | Show/hide Navigation component |
| `sticky` | `boolean` | `true` | Enable sticky positioning |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Custom content (buttons, search, etc.) |

## Examples

### Text Logo
```jsx
<Header logo="StoryLineOS" />
```

### Image Logo
```jsx
<Header
  logo={<img src="/logo.svg" alt="Company" />}
  logoLink="/"
/>
```

### With Custom Content
```jsx
<Header logo="My App">
  <button>Search</button>
  <button>Login</button>
</Header>
```

### Without Navigation
```jsx
<Header logo="Landing Page" showNavigation={false} />
```

### Non-Sticky
```jsx
<Header logo="My App" sticky={false} />
```

## Testing

Run tests:
```bash
npm test Header
```

22 comprehensive tests covering all functionality.

## Related Components

- **Navigation**: Integrated navigation menu
- **Link**: Used for logo link
- **Footer**: Complementary footer component
