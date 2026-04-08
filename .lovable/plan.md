

## Quiz Icons & Animations Redesign

### Problem
The current quiz has generic "shake" rotation on hover for every icon — it feels gimmicky and doesn't relate to what each icon represents. The user wants contextual, meaningful animations and a cleaner layout matching the uploaded screenshot's minimal aesthetic.

### Approach

**1. Contextual hover animations per icon** — each option gets a unique, thematic micro-animation:

| Option | Icon | Hover Animation |
|--------|------|----------------|
| Beach / Waves | `Waves` | Gentle vertical wave (`y: [0, -3, 0, 2, 0]`) |
| Mountains | `Mountain` | Subtle rise up (`y: -4`) |
| City | `Building2` | Scale up slightly (`scale: 1.1`) |
| Countryside | `TreePine` | Gentle sway (`rotate: [0, -3, 3, 0]`) |
| Adventure | `Compass` | Slow spin (`rotate: 360`, 1.5s) |
| Culture | `Landmark` | Fade glow (opacity pulse via `scale: [1, 1.08, 1]`) |
| Relaxation | `Palmtree` | Sway like wind (`rotate: [0, -5, 5, -2, 0]`) |
| Gastronomy | `UtensilsCrossed` | Subtle bounce (`y: [0, -4, 0]`) |
| Budget | `Wallet` | Quick squeeze (`scaleX: [1, 0.9, 1]`) |
| Moderate | `BadgeDollarSign` | Gentle nod (`y: [0, -3, 0]`) |
| Comfortable | `CreditCard` | Slide shimmer (`x: [0, 3, 0]`) |
| Luxury | `Gem` | Sparkle scale (`scale: [1, 1.12, 1]`) |
| Solo | `User` | Gentle float (`y: -3`) |
| Couple | `Heart` | Heartbeat (`scale: [1, 1.15, 1, 1.1, 1]`) |
| Family | `Users` | Gentle gather (`scale: 1.05`) |
| Friends | `UserPlus` | Bounce in (`y: [0, -5, 0]`) |
| Slow & deep | `Snail` | Slow crawl (`x: [0, 4, 0]`, 1.2s) |
| Balanced | `Scale` | Gentle tilt (`rotate: [0, -5, 5, 0]`) |
| Fast & packed | `Zap` | Quick flash (`opacity: [1, 0.5, 1]`, fast) |

**2. Cleaner card layout** — match the uploaded screenshot:
- Left-aligned text (not centered) with icon on the right side
- Horizontal card style instead of vertical icon-above-text
- Remove `whileHover={{ scale: 1.04 }}` from cards — keep them grounded
- Selected state: `bg-primary text-white` with a subtle check or filled appearance
- Unselected: `bg-surface` with clean rounded corners

**3. Store animation config in the data** — each option object gets a `hoverAnim` property with the Framer Motion values, keeping the render logic clean.

### Files Changed
- `src/pages/Quiz.tsx` — restructure option cards to horizontal layout with right-aligned icons, add per-icon animation configs, remove generic shake animation.

