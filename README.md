# FRAME — Premium Editorial Photo Gallery

An editorial photographic journal web application built with **React**, **Vite** and **Tailwind CSS**.  
Designed with the visual restraint and typography of an independent art publication while fulfilling all requirements of the Celebrare Frontend Intern technical assignment.

Fetches 30 curated photographs from the [Picsum Photos](https://picsum.photos) API, provides real-time client-side author search, and supports persistent favourites with `useReducer` and `localStorage`.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Open the development server at `http://localhost:5173`.

---

## Technical Assignment Compliance

| Requirement | Implementation | Technical Details |
|---|---|---|
| **1. React + Vite + Tailwind** | React 19, Vite 6, Tailwind CSS 3 | Zero UI component libraries (no MUI, Ant Design, Bootstrap). Custom theme with bespoke editorial palette. |
| **2. Fetch 30 photos** | `useFetchPhotos` hook | Fetches `https://picsum.photos/v2/list?limit=30` on mount with `AbortController` cleanup and `response.ok` check. |
| **3. Loading & error states** | `LoadingState.jsx`, `ErrorState.jsx` | Understated skeleton cards; clear error notification with a retry action that re-triggers the custom hook. |
| **4. Responsive grid** | `Gallery.jsx` | Mobile: 1 column (`grid-cols-1`), Tablet: 2 columns (`sm:grid-cols-2`), Desktop: 4 columns (`lg:grid-cols-4`). Zero horizontal overflow. |
| **5. Author search** | `SearchBar.jsx`, `Gallery.jsx` | Case-insensitive filter computed in real time without extra API calls. Includes empty state and a clear action. |
| **6. Favourites via `useReducer`** | `favouritesReducer.js`, `Gallery.jsx` | State managed via `TOGGLE_FAVOURITE` and `INITIALIZE_FAVOURITES` actions. Persists through `localStorage` with safe `try/catch` and array validation. |
| **7. `useCallback` & `useMemo`** | `Gallery.jsx` | `useCallback` wraps the search change handler; `useMemo` calculates the filtered photo list. |

---

## Design System

- **Background**: Warm paper ivory (`#F7F5F0`)
- **Primary Typography**: Deep charcoal (`#24231F`)
- **Secondary Typography**: Muted warm grey (`#77746D`)
- **Dividers & Borders**: Subtle warm grey (`#DFDCD4`)
- **Surface**: Clean off-white (`#FEFEFE`)
- **Favourite Accent**: Restrained muted burgundy / terracotta (`#8B3A3A`)
- **Typography Pairing**: *Playfair Display* (editorial masthead & headline) + *Inter* (interface, captions & metadata)
- **Image Treatment**: 4:3 aspect ratio with restrained 1.03× hover zoom and overflow clipping
- **Accessibility**: Full keyboard navigation, visible focus rings, dynamic `aria-label` & `aria-pressed`, `role="status"` and `role="alert"`, and full `prefers-reduced-motion` suppression.

---

## Project Structure

```
src/
  components/
    Gallery.jsx          ← Orchestrates fetch, search, favourites, grid, and empty state
    PhotoCard.jsx        ← 4:3 card with author, ID, and accessible heart toggle
    SearchBar.jsx        ← Controlled search input with icon, clear button & label
    LoadingState.jsx     ← Low-contrast 4:3 skeleton placeholder grid
    ErrorState.jsx       ← Editorial error announcement with custom hook retry
  hooks/
    useFetchPhotos.js    ← Custom hook: photos, loading, error, refetch, abort controller
  reducers/
    favouritesReducer.js ← Pure reducer handling TOGGLE_FAVOURITE & INITIALIZE_FAVOURITES
  App.jsx                ← Masthead, editorial hero, and footer layout
  main.jsx               ← React 19 entry point with StrictMode
  index.css              ← Tailwind directives, font smoothing & reduced-motion queries
```
