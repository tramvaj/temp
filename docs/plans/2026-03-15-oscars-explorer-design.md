# Oscars 2026 Explorer — Design

## Goal
Personal data navigation tool to browse 2026 Oscar nominations with cross-linked films and categories.

## Views

### By Category (default)
- All 23 categories listed vertically
- Each shows its nominees; winners highlighted (bold + subtle gold accent)
- Film names are clickable → switches to Film view

### Film View
- Shows a single film and all its nominations across categories
- Winners highlighted same as category view
- Category names clickable → scrolls to that category in main view
- "Back to all" link returns to full list

## Search
- Single text input at the top
- Filters everything in real-time (categories, nominees, films)
- Works in both views

## Tech
- All client-side, no API routes
- JSON imported statically into the page
- Single `app/page.tsx` as client component
- CSS modules for styling (no extra deps)

## Styling
- Clean, minimal, utility-first
- System fonts, good spacing, light background
- Winners: bold + subtle warm accent, not flashy
