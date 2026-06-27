# Navbar Component Documentation

---

## 1. Overview

The **Navbar** component provides a flexible, responsive navigation bar for building header sections in web applications.

- **Problem it solves**: Offers a standardized, accessible way to display branding, navigation links, and actions across the top of an application, handling layout, variant styling, and active state management.
- **When to use**: Use for primary site navigation, application headers, or any persistent top‑level menu.
- **When *not* to use**: Do not use for secondary side navigation, breadcrumb trails, or dense tab bars where a dedicated component exists.

---

## 2. Features

- Variant support: `default`, `transparent`, `bordered`.
- Alignment options for content (`start`, `center`, `end`).
- Active state styling for items and links.
- Composable sub‑components: `Navbar.Brand`, `Navbar.Content`, `Navbar.Item`, `Navbar.Link`, `Navbar.Separator`.
- CSS class and custom className merging.
- Full keyboard and ARIA compliance via native HTML elements.

---

## 3. Import

```jsx
import Navbar from "rachanaui"; // or { Navbar } if exported as named
```

---

## 4. Basic Usage

```jsx
import Navbar from "rachanaui";

function App() {
  return (
    <Navbar variant="default">
      <Navbar.Brand href="/">MyApp</Navbar.Brand>
      <Navbar.Content align="center">
        <Navbar.Link href="/dashboard" active>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/settings">Settings</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content align="end">
        <Navbar.Item>Profile</Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
```

---

## 5. Variants

| Variant | Description | Example |
|--------|-------------|---------|
| `default` | Standard solid background. | `variant="default"` |
| `transparent` | Transparent background, useful over hero images. | `variant="transparent"` |
| `bordered` | Adds a thin bottom border to separate from content. | `variant="bordered"` |

**Usage example (transparent):**

```jsx
<Navbar variant="transparent">
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  {/* … */}
</Navbar>
```

---

## 6. Sizes

The Navbar does not expose size variants. Styling can be adjusted via CSS or theme overrides.

---

## 7. States

- **Default** – normal appearance.
- **Active** – applies to `Navbar.Item` and `Navbar.Link` when the `active` prop is true, adding an `--active` modifier class.
- **Hover / Focus** – native hover/focus styles are provided by CSS.

---

## 8. Props

### Navbar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Content rendered inside the navbar (Brand, Content, etc.). |
| `variant` | `'default' \| 'transparent' \| 'bordered'` | `'default'` | Visual variant of the navbar. |
| `className` | `string` | `''` | Additional CSS class names for custom styling. |

### Navbar.Brand

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Brand content, usually a logo or text. |
| `href` | `string` | `'/'` | Destination URL when clicked. |
| `className` | `string` | `''` | Custom class names. |

### Navbar.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Navigation items placed inside this block. |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal alignment of the content. |
| `className` | `string` | `''` | Custom class names. |

### Navbar.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Content of the item. |
| `active` | `boolean` | `false` | If true, applies active styling. |
| `className` | `string` | `''` | Custom class names. |

### Navbar.Link

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Link text or elements. |
| `href` | `string` | `'#'` | Destination URL. |
| `active` | `boolean` | `false` | Active state styling. |
| `onClick` | `() => void` | – | Click handler. |
| `className` | `string` | `''` | Custom class names. |

### Navbar.Separator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Custom class names for the separator line. |

---

## 9. Composition

The Navbar is built from composable parts, allowing flexible layouts:

```jsx
<Navbar>
  <Navbar.Brand>MyApp</Navbar.Brand>
  <Navbar.Content align="start">
    <Navbar.Link href="/home" active>Home</Navbar.Link>
    <Navbar.Link href="/about">About</Navbar.Link>
  </Navbar.Content>
  <Navbar.Content align="end">
    <Navbar.Item>Login</Navbar.Item>
    <Navbar.Separator />
    <Navbar.Item>Sign Up</Navbar.Item>
  </Navbar.Content>
</Navbar>
```

---

## 10. Styling & Customization

- **CSS classes**: Each element adds a base class (`navbar`, `navbar-item`, `navbar-link`, etc.) and modifier classes (`--active`, `--transparent`, etc.).
- **`className` prop**: Merge custom classes with the component’s internal classes.
- **Theme overrides**: Use CSS variables or your own stylesheet to adjust colors, paddings, and heights. Example:

```css
:root {
  --navbar-bg: #1a1a1a;
  --navbar-color: #fff;
}

.navbar {
  background: var(--navbar-bg);
  color: var(--navbar-color);
}
```

- **Inline style**: Pass a `style` object via the surrounding element if needed (not explicitly provided by the component but possible via `className`).

---

## 11. Accessibility

- Uses native `<header>` and `<a>`/`<div>` elements ensuring correct semantic meaning.
- Keyboard navigation works with standard tab order; links are focusable.
- Active state is conveyed via visual styling; developers should also consider `aria-current="page"` on active links for screen readers (can be added manually).
- Color contrast should meet WCAG AA; ensure custom theme colors do so.

---

## 12. Responsive Behavior

- The Navbar layout is fluid and adapts to container width.
- Content alignment (`start`, `center`, `end`) works across breakpoints.
- For complex responsive needs (e.g., collapsing into a hamburger menu), compose the Navbar with a custom toggle component – the core Navbar does not include built‑in collapse logic.

---

## 13. Best Practices

### ✅ Do
- Choose a single variant for consistency across pages.
- Use `Navbar.Brand` for logo or site title linking to the home page.
- Keep navigation links clear and concise.
- Mark the current page link with `active` (and optionally `aria-current`).
- Use custom classes to apply consistent spacing.

### ❌ Don't
- Overload the Navbar with unrelated UI (forms, large images, etc.).
- Rely solely on color to indicate active state; include text or icon cues.
- Mix multiple alignment values within the same `Navbar.Content` block.

---

## 14. Common Use Cases

- **Enterprise dashboards** – top navigation with brand, primary sections, and user profile actions.
- **SaaS product header** – brand on the left, navigation links centered, account menu on the right.
- **Marketing landing pages** – transparent variant over hero imagery.
- **Admin panels** – bordered variant to separate header from content area.

---

## 15. Examples

### Simple Navbar
```jsx
<Navbar>
  <Navbar.Brand>Logo</Navbar.Brand>
</Navbar>
```

### Navbar with Links
```jsx
<Navbar>
  <Navbar.Brand href="/">MyApp</Navbar.Brand>
  <Navbar.Content align="center">
    <Navbar.Link href="/" active>Home</Navbar.Link>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Navbar.Link href="/contact">Contact</Navbar.Link>
  </Navbar.Content>
</Navbar>
```

### Navbar with Custom Styling
```jsx
<Navbar className="custom-navbar" variant="bordered">
  <Navbar.Brand className="custom-brand">MyApp</Navbar.Brand>
  <Navbar.Content align="end">
    <Navbar.Item className="login-btn">Login</Navbar.Item>
  </Navbar.Content>
</Navbar>
```

---

## 16. API Reference

- **Component**: `Navbar`
- **Static sub‑components**: `Navbar.Brand`, `Navbar.Content`, `Navbar.Item`, `Navbar.Link`, `Navbar.Separator`
- **Props**: See sections 8 (props tables) for each sub‑component.
- **CSS classes**:
  - `navbar`, `navbar--default`, `navbar--transparent`, `navbar--bordered`
  - `navbar-brand`
  - `navbar-content`, `navbar-content--start`, `navbar-content--center`, `navbar-content--end`
  - `navbar-item`, `navbar-item--active`
  - `navbar-link`, `navbar-link--active`
  - `navbar-separator`

---

*Documentation generated on 2026‑06‑27.*
