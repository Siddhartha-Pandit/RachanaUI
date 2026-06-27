# Icon Component

`Icon` is a lightweight, high-performance React component used to render clean, scalable vector graphics (SVGs). It provides support for over 300+ pixel-perfect UI icons, custom sizes, custom colors, animations (spinning, pulsing), rotations, and accessible tags.

---

## 1. Overview

Icons are vital visual indicators in modern user interfaces. They help:
* **Speed Up Comprehension**: Users recognize common icons (like search, settings, or shopping carts) faster than text.
* **Save Screen Space**: Replace verbose text labels in dense layouts, sidebars, or toolbars.
* **Enhance Visual Aesthetics**: Maintain consistent branding and visual design patterns across the application.

Using a centralized icon library like `RachanaUI/Icons` ensures that all icons in your application share the same stroke weight, design grid, bounding box size, and resizing behavior.

---

## 2. Features

* **SVG-based Rendering**: Clean, vector-based rendering that remains sharp at any size or pixel density.
* **Tree-Shaking Support**: Import only the specific icons you need to keep your production bundles minimal.
* **Centralized `<Icon>` wrapper**: Render icons dynamically via a string identifier (e.g. `<Icon name="home" />`).
* **Interactive Features**: Accessible keyboard and screen-reader support when `onClick` handlers are supplied.
* **Custom Styling & Color**: Supports `size`, `color`, `strokeWidth`, and theme integration.
* **Variant support**: Render in `outline` (default), `filled`, or `duotone` variants.
* **Animations**: Built-in animations for loading states (`spin`) or notification markers (`pulse`).
* **Transforms**: Easily rotate (degrees) or flip (horizontal/vertical) icons using simple props.

---

## 3. Import

`RachanaUI` supports both importing specific icons directly (recommended for bundle size efficiency) and using the generic dynamic `<Icon>` component:

```tsx
// 1. Centralized dynamic Icon component
import { Icon } from "rachana-ui";

// 2. Direct named Icon imports (optimized for tree-shaking)
import { HomeIcon, SearchIcon, SettingsIcon } from "rachana-ui";
```

---

## 4. Basic Usage

### Using the Generic `<Icon>` Component
Pass the string name of the icon (supports kebab-case or PascalCase with or without the "Icon" suffix):

```tsx
import { Icon } from "rachana-ui";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Icon name="home" />
      <Icon name="search" />
      <Icon name="user" />
    </div>
  );
}
```

### Using Direct Icon Components
Import and render specific icon components directly:

```tsx
import { HomeIcon, SearchIcon, UserIcon } from "rachana-ui";

export default function App() {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <HomeIcon />
      <SearchIcon />
      <UserIcon />
    </div>
  );
}
```

---

## 5. Variants & Configurations

### A. Sizes
You can specify sizes using numbers (pixels) or semantic size keys: `'xs' (12px)`, `'sm' (16px)`, `'md' (20px)`, `'lg' (24px)`, `'xl' (32px)`, `'2xl' (48px)`.

```tsx
<>
  <Icon name="home" size="xs" />   {/* 12px */}
  <Icon name="home" size="sm" />   {/* 16px */}
  <Icon name="home" size="md" />   {/* 20px (Default) */}
  <Icon name="home" size="lg" />   {/* 24px */}
  <Icon name="home" size={40} />   {/* Custom 40px */}
</>
```

### B. Colors
Supports standard hex codes, RGB, HSL, or CSS variables.

```tsx
<>
  <Icon name="home" color="#2563eb" />
  <Icon name="heart" color="#ef4444" />
  <Icon name="check" color="var(--success-400)" />
</>
```

### C. Style Variants
Set the icon style variant to `'outline'` (default), `'filled'`, or `'duotone'`.

```tsx
<>
  {/* Standard outline stroke */}
  <Icon name="heart" variant="outline" />

  {/* Solid background fill */}
  <Icon name="heart" variant="filled" />

  {/* Two-layer semi-transparent rendering */}
  <Icon name="heart" variant="duotone" />
</>
```

### D. Custom Weights & Stroke Widths
For outline/duotone variants, customize the line thickness.

```tsx
<>
  <Icon name="settings" weight="thin" />     {/* Thin lines */}
  <Icon name="settings" weight="regular" />  {/* Normal lines */}
  <Icon name="settings" weight="bold" />     {/* Bold lines */}
  <Icon name="settings" strokeWidth={1.5} />  {/* Explicit width */}
</>
```

### E. Clickable Icons
When you attach an `onClick` callback, the icon renders as an interactive element. Supply a descriptive `label` for screen readers.

```tsx
function SearchBar() {
  const handleClear = () => console.log("Cleared");

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <Icon 
        name="close" 
        onClick={handleClear} 
        label="Clear search query" 
      />
    </div>
  );
}
```

### F. Transformations (Rotate & Flip)
Perform non-destructive visual adjustments:

```tsx
<>
  {/* Rotate 90 degrees */}
  <Icon name="arrow-right" rotate={90} />

  {/* Flip horizontally */}
  <Icon name="arrow-right" flipH />

  {/* Flip vertically */}
  <Icon name="arrow-right" flipV />
</>
```

### G. Animations
Supports smooth rotation (`spin`) and blinking visibility (`pulse`).

```tsx
<>
  {/* Indefinite spinning loader */}
  <Icon name="loading" spin />
  
  {/* Pulsing attention tracker */}
  <Icon name="bell" pulse />
</>
```

---

## 6. Props Table

The generic `<Icon>` component accepts the following props:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | — | Name of the icon (e.g. `"home"`, `"settings"`). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number` | `'md'` | Bounding box width and height (semantic label or pixels). |
| `color` | `string` | `'currentColor'` | Primary color for solid paths or outline strokes. |
| `secondaryColor`| `string` | `color` | Secondary layer color for the `'duotone'` variant. |
| `weight` | `'thin' \| 'light' \| 'regular' \| 'bold'` | `'regular'`| Preset line weights (automatically converts to stroke-width values). |
| `strokeWidth` | `number` | — | Explicit custom outline line width in pixels. |
| `variant` | `'outline' \| 'filled' \| 'duotone'` | `'outline'` | Style representation of the icon vectors. |
| `rotate` | `number` | `0` | Angle in degrees (clockwise) to rotate the icon. |
| `flipH` | `boolean` | `false` | Flip the icon horizontally. |
| `flipV` | `boolean` | `false` | Flip the icon vertically. |
| `spin` | `boolean` | `false` | Apply an infinite linear rotation animation. |
| `pulse` | `boolean` | `false` | Apply an infinite ease-in-out opacity pulsing animation. |
| `label` | `string` | — | Text label read by assistive screen readers (adds `aria-label`). |
| `className` | `string` | `""` | Additional CSS classes for custom styling. |
| `style` | `CSSProperties` | `{}` | Inline CSS styles. |
| `onClick` | `() => void` | — | Click event callback function. |

---

## 7. Available Icons

Here is the complete registry of available icons in `RachanaUI`, categorized by common groupings:

### 🧭 Navigation & Layout
* `HomeIcon` (or `"home"`)
* `DashboardIcon` (or `"dashboard"`)
* `SidebarIcon` (or `"sidebar"`)
* `MenuIcon` (or `"menu"`)
* `GridIcon` (or `"grid"`)
* `ListIcon` (or `"list"`)
* `ColumnsIcon` (or `"columns"`)
* `RowsIcon` (or `"rows"`)
* `LayoutIcon` (or `"layout"`)
* `MaximizeIcon` (or `"maximize"`)
* `MinimizeIcon` (or `"minimize"`)
* `ExpandIcon` (or `"expand"`)
* `CollapseIcon` (or `"collapse"`)
* `DragHandleIcon` (or `"drag-handle"`)
* `LayersIcon` (or `"layers"`)
* `PinIcon` (or `"pin"`)
* `UnpinIcon` (or `"unpin"`)
* `SidebarOpenIcon` (or `"sidebar-open"`)
* `SidebarCloseIcon` (or `"sidebar-close"`)
* `PanelIcon` (or `"panel"`)
* `DrawerIcon` (or `"drawer"`)
* `FullscreenIcon` (or `"fullscreen"`)
* `KanbanIcon` / `ViewBoardIcon` (or `"kanban"`)
* `ViewTimelineIcon` (or `"view-timeline"`)
* `ViewCalendarIcon` (or `"view-calendar"`)
* `ViewTableIcon` (or `"view-table"`)
* `GanttIcon` (or `"gantt"`)
* `TreeIcon` (or `"tree"`)
* `HierarchyIcon` (or `"hierarchy"`)
* `SplitIcon` (or `"split"`)
* `ModalIcon` (or `"modal"`)
* `TooltipIcon` (or `"tooltip"`)
* `PopoverIcon` (or `"popover"`)
* `ChevronRightIcon` (or `"chevron-right"`)
* `IndexIcon` (or `"index"`)

### ⚡ Actions & CRUD
* `PlusIcon` (or `"plus"`)
* `MinusIcon` (or `"minus"`)
* `EditIcon` (or `"edit"`)
* `PencilIcon` (or `"pencil"`)
* `TrashIcon` (or `"trash"`)
* `SaveIcon` (or `"save"`)
* `CopyIcon` (or `"copy"`)
* `PasteIcon` (or `"paste"`)
* `CutIcon` (or `"cut"`)
* `DuplicateIcon` (or `"duplicate"`)
* `ArchiveIcon` (or `"archive"`)
* `RestoreIcon` (or `"restore"`)
* `ImportIcon` (or `"import"`)
* `ExportIcon` (or `"export"`)
* `UploadIcon` (or `"upload"`)
* `DownloadIcon` (or `"download"`)
* `RefreshIcon` (or `"refresh"`)
* `SyncIcon` (or `"sync"`)
* `UndoIcon` (or `"undo"`)
* `RedoIcon` (or `"redo"`)
* `ResetIcon` (or `"reset"`)

### 📄 Files & Documents
* `FileIcon` (or `"file"`)
* `FilePlusIcon` (or `"file-plus"`)
* `FileMinusIcon` (or `"file-minus"`)
* `FileTextIcon` / `DocumentIcon` (or `"file-text"`)
* `FileCodeIcon` (or `"file-code"`)
* `FileCsvIcon` (or `"file-csv"`)
* `FilePdfIcon` (or `"file-pdf"`)
* `FileImageIcon` (or `"file-image"`)
* `FolderIcon` (or `"folder"`)
* `FolderOpenIcon` (or `"folder-open"`)
* `FolderPlusIcon` (or `"folder-plus"`)
* `AttachmentIcon` / `PaperclipIcon` (or `"attachment"`)
* `ReportIcon` (or `"report"`)
* `InvoiceIcon` (or `"invoice"`)
* `ContractIcon` (or `"contract"`)
* `TemplateIcon` (or `"template"`)

### 💬 Communication
* `MailIcon` (or `"mail"`)
* `MailOpenIcon` (or `"mail-open"`)
* `MailUnreadIcon` (or `"mail-unread"`)
* `InboxIcon` (or `"inbox"`)
* `SendIcon` (or `"send"`)
* `ReplyIcon` (or `"reply"`)
* `ReplyAllIcon` (or `"reply-all"`)
* `ForwardIcon` (or `"forward"`)
* `ChatIcon` (or `"chat"`)
* `ChatBubbleIcon` (or `"chat-bubble"`)
* `SmsIcon` (or `"sms"`)
* `PhoneIcon` (or `"phone"`)
* `PhoneCallIcon` (or `"phone-call"`)
* `PhoneMissedIcon` (or `"phone-missed"`)
* `VideoCallIcon` (or `"video-call"`)
* `BellIcon` (or `"bell"`)
* `NotificationIcon` (or `"notification"`)
* `BellOffIcon` (or `"bell-off"`)
* `MegaphoneIcon` / `AnnouncementIcon` (or `"megaphone"`)

### 👥 User & Team
* `UserIcon` / `PersonIcon` (or `"user"`)
* `UserPlusIcon` (or `"user-plus"`)
* `UserMinusIcon` (or `"user-minus"`)
* `UserCheckIcon` (or `"user-check"`)
* `UserXIcon` (or `"user-x"`)
* `UsersIcon` (or `"users"`)
* `AvatarIcon` / `ProfileIcon` (or `"avatar"`)
* `ContactIcon` (or `"contact"`)
* `OrganizationIcon` (or `"organization"`)
* `DepartmentIcon` (or `"department"`)
* `RoleIcon` (or `"role"`)
* `BadgeIcon` (or `"badge"`)
* `IdCardIcon` (or `"id-card"`)
* `CrownIcon` (or `"crown"`)
* `StarUserIcon` (or `"star-user"`)

### 🔒 Security & Auth
* `LockIcon` (or `"lock"`)
* `UnlockIcon` (or `"unlock"`)
* `KeyIcon` (or `"key"`)
* `PasswordIcon` (or `"password"`)
* `ShieldIcon` (or `"shield"`)
* `ShieldCheckIcon` (or `"shield-check"`)
* `ShieldXIcon` (or `"shield-x"`)
* `FingerprintIcon` (or `"fingerprint"`)
* `EyeIcon` (or `"eye"`)
* `EyeOffIcon` (or `"eye-off"`)
* `LoginIcon` (or `"login"`)
* `LogoutIcon` (or `"logout"`)
* `TwoFactorIcon` (or `"two-factor"`)
* `TokenIcon` (or `"token"`)
* `CertificateIcon` (or `"certificate"`)
* `PrivacyIcon` (or `"privacy"`)
* `GdprIcon` (or `"gdpr"`)

### 📊 Data & Analytics
* `ChartBarIcon` (or `"chart-bar"`)
* `ChartLineIcon` (or `"chart-line"`)
* `ChartAreaIcon` (or `"chart-area"`)
* `ChartPieIcon` (or `"chart-pie"`)
* `ChartDonutIcon` (or `"chart-donut"`)
* `ChartScatterIcon` (or `"chart-scatter"`)
* `TrendUpIcon` (or `"trend-up"`)
* `TrendDownIcon` (or `"trend-down"`)
* `AnalyticsIcon` (or `"analytics"`)
* `MetricsIcon` (or `"metrics"`)
* `KpiIcon` (or `"kpi"`)
* `TableIcon` (or `"table"`)
* `PivotIcon` (or `"pivot"`)
* `FilterIcon` / `FunnelIcon` (or `"filter"`)
* `SortAscIcon` (or `"sort-asc"`)
* `SortDescIcon` (or `"sort-desc"`)
* `GroupByIcon` (or `"group-by"`)
* `AggregateIcon` (or `"aggregate"`)

### 🔍 Search & Discovery
* `SearchIcon` (or `"search"`)
* `SearchPlusIcon` (or `"search-plus"`)
* `SearchMinusIcon` (or `"search-minus"`)
* `FindReplaceIcon` (or `"find-replace"`)
* `ExploreIcon` / `CompassIcon` (or `"explore"`)
* `TagsIcon` (or `"tags"`)
* `LabelIcon` (or `"label"`)
* `CategoryIcon` (or `"category"`)
* `TaxonomyIcon` (or `"taxonomy"`)

### ⚠️ Status & Feedback
* `CheckIcon` (or `"check"`)
* `CheckCircleIcon` / `SuccessIcon` (or `"check-circle"`)
* `XIcon` (or `"x"`)
* `XCircleIcon` / `ErrorIcon` / `CancelledIcon` (or `"x-circle"`)
* `AlertTriangleIcon` (or `"alert-triangle"`)
* `AlertCircleIcon` / `WarningIcon` (or `"alert-circle"`)
* `InfoIcon` / `InfoCircleIcon` (or `"info"`)
* `QuestionIcon` / `QuestionCircleIcon` (or `"question"`)
* `LoadingIcon` (or `"loading"`)
* `PendingIcon` (or `"pending"`)
* `InProgressIcon` (or `"in-progress"`)
* `BlockedIcon` (or `"blocked"`)
* `EmptyStateIcon` (or `"empty-state"`)
* `SkeletonIcon` (or `"skeleton"`)

### ⚙️ Settings & Configuration
* `SettingsIcon` (or `"settings"`)
* `SlidersIcon` (or `"sliders"`)
* `ToggleIcon` (or `"toggle"`)
* `AdjustmentsIcon` (or `"adjustments"`)
* `ConfigIcon` (or `"config"`)
* `WrenchIcon` (or `"wrench"`)
* `ToolIcon` (or `"tool"`)
* `BuildIcon` (or `"build"`)
* `CodeIcon` (or `"code"`)
* `TerminalIcon` (or `"terminal"`)
* `ApiIcon` (or `"api"`)
* `WebhookIcon` (or `"webhook"`)
* `IntegrationIcon` (or `"integration"`)
* `PluginIcon` (or `"plugin"`)
* `ExtensionIcon` (or `"extension"`)
* `ModulesIcon` (or `"modules"`)

### 📅 Calendar & Time
* `CalendarIcon` (or `"calendar"`)
* `CalendarBsIcon` (or `"calendar-bs"`)
* `CalendarPlusIcon` (or `"calendar-plus"`)
* `CalendarEventIcon` (or `"calendar-event"`)
* `DatePickerIcon` (or `"date-picker"`)
* `ClockIcon` (or `"clock"`)
* `ClockHistoryIcon` (or `"clock-history"`)
* `TimerIcon` (or `"timer"`)
* `StopwatchIcon` (or `"stopwatch"`)
* `DeadlineIcon` (or `"deadline"`)
* `ScheduleIcon` (or `"schedule"`)
* `RecurringIcon` (or `"recurring"`)
* `TimeZoneIcon` (or `"time-zone"`)
* `DurationIcon` (or `"duration"`)
* `CronIcon` (or `"cron"`)

### 💳 Finance & Billing
* `CreditCardIcon` (or `"credit-card"`)
* `WalletIcon` (or `"wallet"`)
* `ReceiptIcon` (or `"receipt"`)
* `PaymentIcon` (or `"payment"`)
* `RefundIcon` (or `"refund"`)
* `SubscriptionIcon` (or `"subscription"`)
* `PlanIcon` (or `"plan"`)
* `UpgradeIcon` (or `"upgrade"`)
* `DowngradeIcon` (or `"downgrade"`)
* `CouponIcon` (or `"coupon"`)
* `DiscountIcon` (or `"discount"`)
* `TaxIcon` (or `"tax"`)
* `CurrencyIcon` (or `"currency"`)
* `DollarIcon` (or `"dollar"`)
* `EuroIcon` (or `"euro"`)
* `PriceTagIcon` (or `"price-tag"`)
* `BudgetIcon` (or `"budget"`)

### 💻 Development & DevOps
* `CodeBlockIcon` (or `"code-block"`)
* `RestIcon` (or `"rest"`)
* `GraphQlIcon` (or `"graphql"`)
* `DatabaseIcon` (or `"database"`)
* `ServerIcon` (or `"server"`)
* `CloudIcon` (or `"cloud"`)
* `CloudUploadIcon` (or `"cloud-upload"`)
* `CloudDownloadIcon` (or `"cloud-download"`)
* `DeployIcon` (or `"deploy"`)
* `CiCdIcon` (or `"cicd"`)
* `GitIcon` (or `"git"`)
* `BranchIcon` (or `"branch"`)
* `CommitIcon` (or `"commit"`)
* `PullRequestIcon` (or `"pull-request"`)
* `ConsoleIcon` (or `"console"`)
* `DebugIcon` (or `"debug"`)
* `BugIcon` (or `"bug"`)
* `EndpointIcon` (or `"endpoint"`)
* `KeyApiIcon` (or `"key-api"`)
* `VariableIcon` (or `"variable"`)
* `FunctionIconIcon` (or `"function-icon"`)

### 🎨 Media & Rich Text
* `ImageIcon` / `GalleryIcon` (or `"image"`)
* `CameraIcon` (or `"camera"`)
* `VideoIcon` (or `"video"`)
* `AudioIcon` / `MusicIcon` (or `"audio"`)
* `PlayIcon` (or `"play"`)
* `PauseIcon` (or `"pause"`)
* `StopIcon` (or `"stop"`)
* `RecordIcon` (or `"record"`)
* `MicrophoneIcon` (or `"microphone"`)
* `ScreenShareIcon` (or `"screen-share"`)
* `PresentationIcon` / `SlideshowIcon` (or `"presentation"`)
* `EmbedIcon` (or `"embed"`)
* `HtmlTagIcon` (or `"html-tag"`)
* `RichTextIcon` (or `"rich-text"`)
* `MarkdownIcon` (or `"markdown"`)
* `FontIcon` (or `"font"`)
* `BoldIcon` (or `"bold"`)
* `ItalicIcon` (or `"italic"`)
* `UnderlineIcon` (or `"underline"`)
* `LinkIcon` (or `"link"`)
* `UnlinkIcon` (or `"unlink"`)

### 🗺️ Maps & Location
* `MapIcon` (or `"map"`)
* `MapPinIcon` / `LocationIcon` (or `"map-pin"`)
* `GpsIcon` (or `"gps"`)
* `GlobeIcon` (or `"globe"`)
* `RegionIcon` (or `"region"`)
* `CountryIcon` (or `"country"`)
* `AddressIcon` (or `"address"`)
* `DirectionsIcon` (or `"directions"`)
* `RadiusIcon` (or `"radius"`)
* `GeofenceIcon` (or `"geofence"`)

### 🛒 E-commerce
* `CartIcon` (or `"cart"`)
* `BagIcon` (or `"bag"`)
* `WishlistIcon` (or `"wishlist"`)
* `OrderIcon` (or `"order"`)
* `ShippingIcon` (or `"shipping"`)
* `TrackingIcon` (or `"tracking"`)

### 🤝 Business & Support
* `CustomerIcon` (or `"customer"`)
* `LeadIcon` (or `"lead"`)
* `DealIcon` (or `"deal"`)
* `PipelineIcon` (or `"pipeline"`)
* `OpportunityIcon` (or `"opportunity"`)
* `QuoteIcon` (or `"quote"`)
* `ProposalIcon` (or `"proposal"`)
* `TicketIcon` (or `"ticket"`)
* `SupportIcon` / `HelpdeskIcon` (or `"support"`)
* `SlaIcon` (or `"sla"`)
* `FeedbackIcon` / `RatingIcon` / `ReviewIcon` / `NpsIcon` (or `"feedback"`)

### ⭐ Utilities & Badges
* `BookmarkIcon` (or `"bookmark"`)
* `FlagIcon` (or `"flag"`)
* `StarIcon` (or `"star"`)
* `HeartIcon` (or `"heart"`)
* `LikeIcon` (or `"like"`)
* `DislikeIcon` (or `"dislike"`)
* `ShareIcon` (or `"share"`)
* `ExternalLinkIcon` / `RedirectIcon` / `ShortcutIcon` (or `"external-link"`)
* `HotkeyIcon` (or `"hotkey"`)
* `PrintIcon` (or `"print"`)
* `QrCodeIcon` (or `"qr-code"`)
* `BarcodeIcon` (or `"barcode"`)
* `ClipboardIcon` (or `"clipboard"`)
* `ChecklistIcon` (or `"checklist"`)

### 🏁 Shape & Layout Elements
* `DividerIcon` / `SeparatorIcon` (or `"divider"`)
* `SpacerIcon` (or `"spacer"`)
* `MoreHorizontalIcon` / `OverflowIcon` (or `"more-horizontal"`)
* `MoreVerticalIcon` (or `"more-vertical"`)
* `BreadcrumbIcon` (or `"breadcrumb"`)
* `DotIcon` (or `"dot"`)
* `CircleIcon` (or `"circle"`)
* `SquareIcon` (or `"square"`)
* `DiamondIcon` (or `"diamond"`)
* `TradeAnalysisIcon` (or `"TradeAnalysis"`)
* `TradeLogIcon` (or `"TradeLog"`)
* `TradeWalletIcon` (or `"TradeWallet"`)
* `LearnIcon` (or `"Learn"`)

---

## 8. Accessibility (a11y)

* **Decorative Icons**: When icons are purely decorative, they should be hidden from screen readers. RachanaUI icons automatically apply `aria-hidden="true"` and `role="presentation"` by default if no screen reader `label` is specified.
* **Semantic Screen Reader Labels**: Pass the `label` prop to add an `aria-label` and update the role to `img`:
  ```tsx
  <Icon name="trash" label="Delete invoice" />
  ```
* **Clickable Elements**: If an icon is interactive, it should be wrapped inside a semantic `<button>` tag to allow keyboard users to tab focus to it.
  ```tsx
  <button 
    onClick={handleDelete} 
    aria-label="Delete attachment"
    className="icon-btn"
  >
    <Icon name="trash" />
  </button>
  ```
* **Contrast Checks**: Ensure your colors comply with WCAG AA standards (minimum contrast ratio of 4.5:1 for interactive graphics, or 3.0:1 for large scales).

---

## 9. Styling & Customization

You can style icons with custom classes, inline styles, CSS variables, and pseudo-elements.

### A. CSS Class Customization
```tsx
<Icon name="star" className="custom-star" />
```
```css
.custom-star {
  transition: transform 0.2s ease;
}
.custom-star:hover {
  transform: scale(1.2);
  color: #fbbf24; /* Amber yellow color */
}
```

### B. Global Themes via Context
Wrap your application in `IconProvider` to establish a global style setting (such as size, color, or stroke-width) for all icons in the tree:

```tsx
import { IconProvider, Icon } from "rachana-ui";

export default function Layout({ children }) {
  return (
    <IconProvider value={{ size: "lg", color: "var(--brand-500)", strokeWidth: 1.5 }}>
      {children}
    </IconProvider>
  );
}
```

---

## 10. Best Practices

### Do's
* **Do** pair icons with clear text labels in main navigation flows to ensure clarity.
* **Do** keep icon sizes uniform within the same component hierarchy (e.g. all menu icons set to `'sm'`).
* **Do** supply `label` properties for any standalone interactive icons.
* **Do** use `currentColor` to dynamically inherit parent text colors.

### Don'ts
* **Don't** rely on color alone to convey states (e.g. always accompany green checkmarks or red warnings with label text).
* **Don't** mix outline and filled icons within the same context (like a single navigation bar).
* **Don't** make tiny icons clickable. Keep the minimum touch target for interactive icons at `44x44px` by using button paddings.

---

## 11. Common Use Cases

### Search Bar Integration
```tsx
import { Icon } from "rachana-ui";

export const SearchField = () => (
  <div className="search-wrapper">
    <Icon name="search" size="sm" color="#6b7280" />
    <input type="text" placeholder="Search files..." />
  </div>
);
```

### Dashboard Widget Layout
```tsx
import { Icon } from "rachana-ui";

export const MetricsCard = () => (
  <div className="card">
    <div className="card-header">
      <span>Total Sales</span>
      <Icon name="trend-up" color="var(--success-400)" />
    </div>
    <h2>$45,231.89</h2>
  </div>
);
```

---

## 12. Theming

RachanaUI icons dynamically integrate with your light/dark themes by utilizing the default color `currentColor`. This allows icons to automatically change colors based on the surrounding typography.

### Contextual Colors:
* **Primary/Brand**: `<Icon name="info" color="var(--brand-500)" />`
* **Success State**: `<Icon name="check-circle" color="var(--success-500)" />`
* **Warning State**: `<Icon name="alert-triangle" color="var(--warning-500)" />`
* **Error State**: `<Icon name="x-circle" color="var(--danger-500)" />`
* **Disabled State**: `<Icon name="lock" color="var(--neutral-300)" style={{ cursor: "not-allowed" }} />`

---

## 13. Performance & Optimization

* **Use Direct Imports**: To minimize production bundle sizes, import individual icon components directly (`import { HomeIcon } from "rachana-ui"`). This enables webpack, Rollup, or Vite to tree-shake unused icons from the final JavaScript package.
* **Avoid inline arrow function bindings**: Bind event callbacks beforehand to avoid recreating the function handler reference on every single component render.
* **Memoization**: If you render thousands of icons in large grids, memoize parent structures to reduce unnecessary re-renders.
