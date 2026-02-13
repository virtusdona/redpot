# Red Pot Kitchen - Birria Bomb Landing Page PRD

## Original Problem Statement
Build a one page scrolling product website for birria sliders with:
- Brand: Red Pot Kitchen, Product line: Birria Bomb
- Dark premium minimal style
- Exact colors: Background #2C2C2C, Accent orange #E44720, Secondary gold #EAC783, Soft light text #FFEBE6
- Single page with smooth scroll navigation
- Two products: SOLO BOMB (₱65) and DOUBLE BOMB (₱100)
- BUY NOW buttons opening modal with placeholder link

## User Personas
- **Primary**: Students and everyday consumers in Philippines
- **Secondary**: Food enthusiasts looking for affordable comfort food

## Core Requirements (Static)
1. Single page design with smooth scroll navigation
2. Fixed top navigation with RED POT logo, Order/About links, cart icon
3. Hero section with animated logo + BIRRIA BOMB title
4. Two product showcase sections with large background text
5. BUY NOW modal for ordering
6. About section with brand story
7. Minimal footer

## What's Been Implemented (Feb 13, 2026)
- ✅ Fixed navigation with RED POT logo in #E44720
- ✅ Smooth scroll navigation (Home, Order, About)
- ✅ Active nav link underline animation
- ✅ Cart icon (visual only)
- ✅ Hero section with BIRRIA BOMB title and underline animation
- ✅ Logo fallback (RP) when video fails to load
- ✅ SOLO BOMB product card with "SOLO" background text
- ✅ DOUBLE BOMB product card with "DOUBLE" background text
- ✅ Product images from provided assets
- ✅ BUY NOW buttons opening modal
- ✅ Modal closes on X, Escape, overlay click
- ✅ About section with brand story
- ✅ Minimal footer with copyright
- ✅ Page load animations (fade in, scale)
- ✅ Mobile responsive navigation (hamburger menu)
- ✅ Mobile layout for product cards
- ✅ Brand color scheme implementation

## Known Issues
1. **Video Codec**: The provided MP4 animated logo has codec compatibility issues with some browsers. A fallback "RP" logo is displayed instead.

## Prioritized Backlog

### P0 (Blocking - None)
- All core features implemented

### P1 (High Priority)
- Replace placeholder BUY_LINK with actual Tally form URL
- Fix video codec compatibility (re-encode to H.264/WebM)

### P2 (Nice to Have)
- Add social media icons to footer
- Add scroll-to-top button
- Add loading skeleton for images

## Next Tasks
1. User to provide Tally form URL to replace PLACEHOLDER_LINK
2. User to provide re-encoded video file (H.264 codec recommended)
3. Consider adding Instagram/Facebook links to footer

## Tech Stack
- React 19 + Tailwind CSS
- Framer Motion for animations
- Shadcn/UI Dialog component
- Lucide React icons
