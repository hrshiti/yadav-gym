# UI Components Library

Premium, fully responsive UI components for Yadav Fitness Club.

## Components

### 1. **GradientButton**
Premium button with gradient background and smooth animations.
- Variants: primary, outline, ghost, danger, success
- Sizes: sm, md, lg, xl
- Features: Shine effect, ripple effect, loading state

```jsx
<GradientButton variant="primary" size="md" onClick={handleClick}>
  Click Me
</GradientButton>
```

### 2. **Card**
Reusable card container with hover effects.
- Features: Hover animations, glow effect, gradient option
- Padding: none, sm, md, lg, xl

```jsx
<Card hover glow padding="md">
  Card Content
</Card>
```

### 3. **TextInput**
Form input with floating labels and animations.
- Features: Floating labels, error states, icon support, focus glow

```jsx
<TextInput
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### 4. **PageHeader**
Animated page header with breadcrumbs and actions.
- Features: Animated title, breadcrumbs, action buttons, decorative line

```jsx
<PageHeader
  title="Dashboard"
  subtitle="Welcome back!"
  icon={<Icon />}
  actions={<Button>Action</Button>}
/>
```

### 5. **Badge**
Status badges with multiple variants.
- Variants: default, primary, success, danger, warning, purple, gradient
- Features: Pulse animation, icon support

```jsx
<Badge variant="success" pulse>
  Active
</Badge>
```

### 6. **SelectBox**
Custom dropdown with search functionality.
- Features: Searchable, smooth animations, keyboard navigation

```jsx
<SelectBox
  label="Select Option"
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
/>
```

### 7. **FileUpload**
File upload with drag & drop and preview.
- Features: Image preview, drag & drop, file size validation

```jsx
<FileUpload
  label="Upload Photo"
  accept="image/*"
  maxSize={5}
  onChange={handleFile}
/>
```

### 8. **SearchBar**
Search input with debouncing.
- Features: Debounced search, clear button, focus animations

```jsx
<SearchBar
  placeholder="Search..."
  onSearch={handleSearch}
  debounceMs={300}
/>
```

### 9. **Modal**
Modal dialog with backdrop blur.
- Sizes: sm, md, lg, xl, full
- Features: Keyboard escape, backdrop click, smooth animations

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"
>
  Modal Content
</Modal>
```

### 10. **Drawer**
Side drawer with multiple positions.
- Positions: left, right, top, bottom
- Features: Backdrop, smooth slide animations

```jsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="right"
  title="Drawer Title"
>
  Drawer Content
</Drawer>
```

### 11. **Toast**
Notification toast with auto-dismiss.
- Types: success, error, warning, info
- Positions: top-left, top-right, top-center, bottom-left, bottom-right, bottom-center

```jsx
<Toast
  isOpen={showToast}
  onClose={() => setShowToast(false)}
  message="Success message"
  type="success"
  duration={3000}
/>
```

### 12. **Tabs**
Tab navigation with animated underline.
- Variants: default, pills, gradient
- Features: Icon support, smooth transitions

```jsx
<Tabs
  tabs={[
    { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  variant="default"
/>
```

### 13. **SkeletonLoader**
Loading skeleton with pulse animation.
- Variants: text, title, heading, avatar, card, button, image, custom
- Pre-built: SkeletonCard, SkeletonTable, SkeletonProfile

```jsx
<SkeletonLoader variant="card" />
<SkeletonCard />
<SkeletonTable rows={5} cols={4} />
```

### 14. **AnimatedRouteWrapper**
GSAP-powered page transition wrapper.
- Features: "Gym Pulse" effect, smooth page transitions

```jsx
<AnimatedRouteWrapper>
  <YourPageContent />
</AnimatedRouteWrapper>
```

## Design System

All components use the following design tokens:
- **Colors**: Primary Blue (#305EFF), Purple (#8A4CFF)
- **Typography**: Poppins/Inter (headings), Inter/Roboto (body)
- **Animations**: Framer Motion + GSAP
- **Responsive**: Mobile-first design

## Usage

Import components individually or from the index:

```jsx
import { GradientButton, Card, TextInput } from '@/components';
```

