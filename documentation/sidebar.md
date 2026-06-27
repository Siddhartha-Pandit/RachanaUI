# Sidebar Component

`Sidebar` is a vertical navigation component that acts as the primary layout menu for applications. It provides structured navigation links, supports nested menu structures, section groupings, badge notifications, and is collapsible.

---

## 1. Overview

The `Sidebar` component is designed to manage navigation structures for complex, multi-page applications.

### Problems Solved
* **Cognitive Load**: Organizes complex site structures into logical parent-child hierarchies.
* **Layout Consistency**: Restricts sidebar layouts to consistent patterns, handling headers, content, dividers, and footers uniformly.
* **Responsiveness**: Adapts content presentation based on the collapsible state.

### Common Use Cases
* **Admin Dashboards**: Control panels with multiple reporting views, settings, and user management.
* **SaaS Dashboards**: Direct access to primary workflows, team spaces, billing, and integrations.
* **Documentation Layouts**: Hierarchical directory of guides, references, and articles.

---

## 2. Features

* **Collapsible / Expandable**: Switch between a full-width menu and a space-saving mini menu.
* **Submenu Navigation**: Support for multi-depth nested lists (collapsible parent menus).
* **Active Highlights**: Highlights selected sections based on state.
* **Icon & Badge Support**: Add context (e.g., "Home" icon) or metrics (e.g., inbox count "12") to any navigation link.
* **Semantic HTML / Plain Elements**: Allows substituting component wrappers with standard HTML5 elements (like `<header>` and `<footer>`) using RachanaUI class names.
* **Legacy Adapter**: Includes a simple JSON-based adapter (`SidebarAdapter`) for quick rendering of static navigation arrays.

---

## 3. Import

`RachanaUI` offers three ways to use the Sidebar component:
1. **Compound Component API** (e.g. `<Sidebar.Header>`, `<Sidebar.Content>`)
2. **Direct Subcomponent Named Imports** (e.g. `import { Header, Content, MenuItem } from "rachana-ui"`)
3. **Simplified Adapter API** (For quick, configuration-driven rendering)

```tsx
// 1. Compound Import (Default style)
import { Sidebar, SidebarAdapter } from "rachana-ui";

// 2. Direct Named Import (Clean Aliases or Prefixed names)
import { 
  Sidebar, 
  Header, 
  Content, 
  Trigger, 
  Brand, 
  Group, 
  Menu, 
  MenuItem 
} from "rachana-ui";
// or with prefixes:
// import { SidebarHeader, SidebarContent, SidebarTrigger } from "rachana-ui";
```

---

## 4. Basic Usage

### A. Compound Component (Recommended)
This approach uses the standard helper components. It is cleaner and automatically maps CSS class properties:

```tsx
import React, { useState } from "react";
import { Sidebar } from "rachana-ui";
import { HomeIcon, SettingsIcon, UsersIcon } from "rachana-ui/icons"; // or your own icon library

export default function MyDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar 
        collapsed={collapsed} 
        activeItem={activeItem}
        onItemClick={(label) => setActiveItem(label)}
      >
        <Sidebar.Header>
          <Sidebar.Brand>My App</Sidebar.Brand>
          <Sidebar.Trigger onClick={() => setCollapsed(!collapsed)} />
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group label="Main">
            <Sidebar.Menu>
              <Sidebar.MenuItem label="Home" icon={HomeIcon} />
              <Sidebar.MenuItem label="Users" icon={UsersIcon} badge="24" />
            </Sidebar.Menu>
          </Sidebar.Group>
          
          <Sidebar.Separator />

          <Sidebar.Group label="Configuration">
            <Sidebar.Menu>
              <Sidebar.MenuItem label="Settings" icon={SettingsIcon} />
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem label="Logout" danger />
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar>
      
      <main style={{ flex: 1, padding: "24px" }}>
        <h1>Content Area</h1>
      </main>
    </div>
  );
}
```

### B. Custom Semantic HTML Elements (Alternative)
If you prefer not to use wrapper subcomponents like `<Sidebar.Header>` or `<Sidebar.Footer>`, you can use native semantic HTML tags. Simply apply the corresponding class names:

```tsx
import React, { useState } from "react";
import { Sidebar } from "rachana-ui";

export default function MyDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed}>
        {/* Native <header> instead of <Sidebar.Header> */}
        <header className="sidebar-header">
          {!collapsed && <span className="sidebar-logo">My App</span>}
          <Sidebar.Trigger onClick={() => setCollapsed(!collapsed)} />
        </header>

        {/* Native <div> instead of <Sidebar.Content> */}
        <div className="sidebar-content">
          <Sidebar.Group label="Main">
            <Sidebar.Menu>
              <Sidebar.MenuItem label="Home" />
            </Sidebar.Menu>
          </Sidebar.Group>
        </div>

        {/* Native <footer> instead of <Sidebar.Footer> */}
        <footer className="sidebar-footer">
          <Sidebar.Menu>
            <Sidebar.MenuItem label="Logout" danger />
          </Sidebar.Menu>
        </footer>
      </Sidebar>
    </div>
  );
}
```

### C. Direct Named Imports (Alternative)
You can also import subcomponents directly as named exports if you prefer to avoid the compound dot notation (e.g. using `<Header>` instead of `<Sidebar.Header>`):

```tsx
import React, { useState } from "react";
import { Sidebar, Header, Content, Footer, Menu, MenuItem } from "rachana-ui";

export default function MyDashboard() {
  return (
    <Sidebar>
      <Header>
        <span className="sidebar-logo">My App</span>
      </Header>
      
      <Content>
        <Menu>
          <MenuItem label="Home" />
          <MenuItem label="Settings" />
        </Menu>
      </Content>
      
      <Footer>
        <Menu>
          <MenuItem label="Logout" danger />
        </Menu>
      </Footer>
    </Sidebar>
  );
}
```

---

## 5. Class Name Mappings

When writing custom markup inside the `<Sidebar>` root, map the native HTML elements to the following RachanaUI CSS classes to preserve layouts and animations:

| React Subcomponent | Native HTML Alternative | RachanaUI CSS Class |
| :--- | :--- | :--- |
| `<Sidebar.Header>` | `<header>` / `<div>` | `sidebar-header` |
| `<Sidebar.Brand>` | `<span>` / `<h1>` | `sidebar-logo` |
| `<Sidebar.Content>` | `<main>` / `<div>` | `sidebar-content` |
| `<Sidebar.Separator>` | `<hr>` / `<div>` | `sidebar-divider` |
| `<Sidebar.Group>` | `<section>` / `<div>` | `sidebar-section` |
| `<Sidebar.Footer>` | `<footer>` / `<div>` | `sidebar-footer` |

---

## 6. Variants

### A. Fixed Sidebar
A sidebar that stays open at all times. Ideal for widescreen dashboards:

```tsx
<Sidebar collapsed={false}>
  <Sidebar.Header>
    <Sidebar.Brand>Company Admin</Sidebar.Brand>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem label="Overview" />
      <Sidebar.MenuItem label="Analytics" />
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar>
```

### B. Collapsible Sidebar
A sidebar whose open/close state is controlled dynamically by state and toggled using a trigger button:

```tsx
const [isCollapsed, setIsCollapsed] = useState(false);

return (
  <Sidebar collapsed={isCollapsed}>
    <Sidebar.Header>
      <Sidebar.Brand>Dashboard</Sidebar.Brand>
      <Sidebar.Trigger onClick={() => setIsCollapsed(!isCollapsed)} />
    </Sidebar.Header>
    {/* Content... */}
  </Sidebar>
);
```

### C. Icon-only (Mini) Sidebar
When space is limited, the sidebar can be locked in its collapsed state, displaying only icons (labels appear on hover as native tooltips):

```tsx
<Sidebar collapsed={true}>
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem label="Home" icon={HomeIcon} />
      <Sidebar.MenuItem label="Messages" icon={MailIcon} />
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar>
```

### D. Responsive Sidebar (Mobile Drawer Behavior)
On mobile views, the sidebar is hidden offscreen and shown inside a modal overlay (Drawer) when a hamburger menu is toggled.

```tsx
import React, { useState } from "react";
import { Sidebar, Drawer } from "rachana-ui";

export function ResponsiveLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      {/* Mobile Top Navbar with Hamburger */}
      <header className="mobile-header">
        <button onClick={() => setMobileOpen(true)}>☰ Menu</button>
      </header>

      {/* Mobile Sidebar overlay */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} position="left">
        <Sidebar className="mobile-sidebar">
          <header className="sidebar-header">
            <span className="sidebar-logo">Mobile App</span>
          </header>
          <div className="sidebar-content">
            <Sidebar.Menu>
              <Sidebar.MenuItem label="Home" icon={HomeIcon} />
            </Sidebar.Menu>
          </div>
        </Sidebar>
      </Drawer>

      {/* Desktop Sidebar Layout */}
      <div className="desktop-layout">
        <Sidebar>
          {/* Sidebar items */}
        </Sidebar>
      </div>
    </div>
  );
}
```

---

## 7. Props Table

### `Sidebar` (Root)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | — | Content of the sidebar (Header, Content, Footer). |
| `defaultCollapsed` | `boolean` | `false` | Initial collapse state when uncontrolled. |
| `collapsed` | `boolean` | — | Controlled collapse state. |
| `onCollapsedChange` | `(collapsed: boolean) => void` | — | Callback triggered when collapse state toggles. |
| `activeItem` | `string` | — | Current active menu item label. |
| `onItemClick` | `(label: string) => void` | — | Callback triggered when a menu item is clicked. |
| `className` | `string` | `""` | Additional CSS class names. |

### `Sidebar.MenuItem`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | — | The text to display. Re-used as the key for active states. |
| `icon` | `FC<IconProps>` | — | The React component icon to render. |
| `badge` | `string \| number` | — | Optional counter or notification pill. |
| `danger` | `boolean` | `false` | Sets styling to a red warning theme (e.g., Logout). |
| `active` | `boolean` | `false` | Explicitly forces the active style state. |
| `children` | `ReactNode` | — | Nested submenu items (`Sidebar.MenuSubItem`). |
| `onClick` | `() => void` | — | Custom click event callback. |

### `Sidebar.Group`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | — | Optional title shown above the group items (hidden when collapsed). |
| `children` | `ReactNode` | — | List of menu items inside the group. |

### `SidebarAdapter` (Legacy)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sections` | `SidebarSection[]` | — | Array containing menu group and navigation data. |
| `footer` | `SidebarItem[]` | — | Array containing items to show in the footer area. |
| `defaultCollapsed` | `boolean` | `false` | Initial collapse state. |
| `activeItem` | `string` | — | Key of the active menu item. |
| `onItemClick` | `(label: string) => void` | — | Click handler callback. |

---

## 8. Navigation Structure

When using the `SidebarAdapter`, define the navigation menu structure using the following TypeScript interfaces:

```typescript
export interface SidebarItem {
  label: string;
  icon?: React.FC<IconProps>;
  badge?: string | number;
  danger?: boolean;
  href?: string;
  active?: boolean;
  children?: SidebarItem[];
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}
```

### Example Data Array
```typescript
const navSections: SidebarSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: HomeIcon, active: true },
      { label: "Analytics", icon: ChartIcon }
    ]
  },
  {
    label: "Management",
    items: [
      {
        label: "Team",
        icon: UserGroupIcon,
        children: [
          { label: "Members" },
          { label: "Roles" }
        ]
      },
      { label: "Inbox", icon: MailIcon, badge: 5 }
    ]
  }
];
```

---

## 9. Accessibility (a11y)

The `Sidebar` component implements high-contrast styling and keyboard-focused standards:
* **Semantic markup**: The root container uses the `<aside>` element.
* **Keyboard access**: Item interactions are buttons with standard click listeners, allowing tab navigation.
* **Focus outline**: Clearly visible CSS focus ring on all menu buttons for keyboard navigation (`:focus-visible`).
* **ARIA attributes**:
  * Toggles use `aria-label="Expand sidebar"` or `aria-label="Collapse sidebar"` dynamically.
  * Collapsed icons render with native `title` tag fallbacks to serve as screen-reader labels.

---

## 10. Responsive Behavior

| Screen Size | Target View | Sidebar Behavior |
| :--- | :--- | :--- |
| **Mobile (`<768px`)** | Offscreen / Drawer | The Sidebar is hidden offscreen. Access should be managed by enclosing it inside a `Drawer` component triggered by a navbar hamburger button. |
| **Tablet (`768px - 1024px`)** | Collapsed / Mini | The Sidebar collapses automatically into a 64px width, rendering only navigation icons. |
| **Desktop (`>1024px`)** | Full Layout | Shows full-width labels, brand headers, grouping titles, and count badges. |

---

## 11. Best Practices

### Do's
* **Do** use icons for all primary menu items so they remain recognizable when the sidebar collapses.
* **Do** order navigation links by user frequency (e.g., Dashboard first, Settings last).
* **Do** keep submenus shallow (maximum 1 level of depth).

### Don'ts
* **Don't** use long text labels. Keep text under 20 characters so it fits comfortably.
* **Don't** use badges on submenus when the sidebar is expected to collapse frequently (badges are hidden when collapsed).
* **Don't** use different icons for the same page across different components of your app.

---

## 12. Common Use Cases

### SaaS Layout Structure
```tsx
import React from 'react';
import { Sidebar } from 'rachana-ui';

export const SaasLayout = () => {
  return (
    <div className="layout-root">
      <Sidebar>
        <header className="sidebar-header">
          <span className="sidebar-logo">SaaS Platform</span>
        </header>
        <div className="sidebar-content">
          <Sidebar.Menu>
            <Sidebar.MenuItem label="Projects" icon={FolderIcon} />
            <Sidebar.MenuItem label="Billing" icon={CreditCardIcon} />
            <Sidebar.MenuItem label="API Keys" icon={KeyIcon} />
          </Sidebar.Menu>
        </div>
      </Sidebar>
    </div>
  );
};
```
