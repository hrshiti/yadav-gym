# Installation Guide

## Phase 1, Chunk 1 - Dependencies Installation

After clearing disk space, run the following command to install all required dependencies:

```bash
npm install react-router-dom framer-motion gsap lenis recharts @tanstack/react-query zustand socket.io-client react-hook-form zod
```

**Note:** Use `lenis` instead of `@studio-freight/lenis` (the old package is deprecated)

## Project Structure Created

✅ All folders have been created:
- `src/components/` - Reusable UI components
- `src/layouts/` - Layout components
- `src/pages/` - Page components
- `src/features/` - Feature-based modules (auth, admin, trainer, member)
- `src/hooks/` - Custom React hooks
- `src/animations/` - Animation utilities
- `src/utils/` - Utility functions
- `src/store/` - State management (Zustand)
- `src/constants/` - Constants and configuration

## Configuration Files Created

✅ `tailwind.config.js` - Tailwind configuration with custom colors
✅ `src/index.css` - Global styles with CSS variables
✅ `src/constants/colors.js` - Color palette constants
✅ `src/utils/routes.js` - Route constants
✅ `src/store/authStore.js` - Authentication store
✅ `src/hooks/useAuth.js` - Authentication hook
✅ `src/App.jsx` - Main app with routing setup
✅ `src/pages/EntryPage.jsx` - Entry page placeholder

## Next Steps

1. Install dependencies (command above)
2. Run `npm run dev` to start development server
3. Proceed to Phase 1, Chunk 2: Design System Setup

