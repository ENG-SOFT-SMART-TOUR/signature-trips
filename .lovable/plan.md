

## Settings Page + Retake Quiz Button

### What we're building
A new `/settings` page where the user can view/edit their profile (name, email) and preferences, plus a prominent "Retake Quiz" button in the top nav bar that lets them redo the personality quiz anytime.

### Plan

**1. Add `updateProfile` action to the store** (`src/store/useStore.ts`)
- New action: `updateProfile(name: string, email: string)` to update user name/email

**2. Create Settings page** (`src/pages/Settings.tsx`)
- Uses `AppLayout` wrapper
- Sections:
  - **Profile** — editable name and email fields with save button
  - **Travel Profile** — shows current quiz answers as tags/badges, with a "Retake Quiz" button that navigates to `/quiz`
  - **Saved Destinations** — count/list of saved destinations with option to clear
  - **Account** — logout button, danger zone styling
- Design system: `bg-surface` cards, `font-display` headings, `font-body` text, `bg-primary` buttons, rounded-xl cards

**3. Add "Retake Quiz" button to the nav** (`src/components/AppLayout.tsx`)
- Add a small refresh/sparkle icon button next to the user avatar pill in the top bar that navigates to `/quiz`
- Tooltip: "Retake Quiz"
- Also add Settings link (gear icon) next to the user avatar

**4. Add route** (`src/App.tsx`)
- Protected route: `/settings` → `<Settings />`

### Files changed
- `src/store/useStore.ts` — add `updateProfile` action
- `src/pages/Settings.tsx` — new file
- `src/components/AppLayout.tsx` — add retake quiz + settings buttons to nav
- `src/App.tsx` — add settings route

