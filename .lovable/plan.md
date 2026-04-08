

## Left Sidebar Navigation + Separate Pages

### What changes

**1. Replace top navbar with left sidebar** (`src/components/AppLayout.tsx`)
- Fixed left sidebar (~240px) with the Signature Trips logo at top
- User name + avatar below logo, clickable to `/settings`
- "Redo Quiz" button with the green shine effect at the top of the sidebar
- Navigation links: Dashboard, Matches, Itineraries, Diaries — each as its own route
- Logout at the bottom
- On mobile: collapsible hamburger overlay

**2. Create dedicated Itineraries page** (`src/pages/Itineraries.tsx`)
- New standalone page at `/itineraries` showing only itineraries grid
- "New Itinerary" button, empty state when none exist

**3. Create dedicated Diaries page** (`src/pages/Diaries.tsx`)
- New standalone page at `/diaries` showing only diaries grid
- Empty state when none exist

**4. Redesign Dashboard as overview** (`src/pages/Dashboard.tsx`)
- Welcome section with user name
- Quick stats row: saved destinations count, itineraries count, diaries count, quiz profile type — small metric cards
- Saved Destinations horizontal scroll (existing)
- Recent Itineraries preview (show latest 3 with "View all" link to `/itineraries`)
- Recent Diaries preview (show latest 3 with "View all" link to `/diaries`)

**5. Update routes** (`src/App.tsx`)
- Add `/itineraries` and `/diaries` as protected routes
- Update nav links from hash-based to path-based

### Sidebar layout structure
```text
┌──────────────┬─────────────────────────┐
│  🧭 Logo     │                         │
│  Redo Quiz   │                         │
│──────────────│                         │
│  Dashboard   │      Main Content       │
│  Matches     │                         │
│  Itineraries │                         │
│  Diaries     │                         │
│──────────────│                         │
│  👤 Name     │                         │
│  Log out     │                         │
└──────────────┴─────────────────────────┘
```

### Files changed
- `src/components/AppLayout.tsx` — full rewrite to left sidebar
- `src/pages/Dashboard.tsx` — redesign as overview with stats + previews
- `src/pages/Itineraries.tsx` — new file
- `src/pages/Diaries.tsx` — new file
- `src/App.tsx` — add new routes

