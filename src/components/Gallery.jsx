/**
 * Gallery.jsx
 *
 * Orchestrates the photo gallery view. It:
 *   1. Calls useFetchPhotos() to get photos / loading / error.
 *   2. Manages the search query with useState + useCallback.
 *   3. Computes the filtered photo list with useMemo.
 *   4. Manages favourites with useReducer + localStorage.
 *   5. Renders SearchBar, the photo grid (PhotoCard), and
 *      the appropriate loading / error / empty states.
 *
 * This is the single "smart" component that owns all state.
 * Individual components below it are purely presentational.
 */
import { useState, useCallback, useMemo, useReducer, useEffect } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos.js';
import {
  favouritesReducer,
  ACTIONS,
} from '../reducers/favouritesReducer.js';
import SearchBar from './SearchBar.jsx';
import PhotoCard from './PhotoCard.jsx';
import LoadingState from './LoadingState.jsx';
import ErrorState from './ErrorState.jsx';

const STORAGE_KEY = 'frame_favourites';

/**
 * Safely read favourites from localStorage.
 * Returns an empty array if the stored value is missing, corrupt, or
 * not an array — the app must never crash on bad stored data.
 */
function loadFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Gallery() {
  // ── Data fetching ────────────────────────────────────────────────
  const { photos, loading, error, refetch } = useFetchPhotos();

  // ── Favourites (useReducer + localStorage) ───────────────────────
  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  // Hydrate favourites from localStorage once on mount.
  useEffect(() => {
    const stored = loadFavourites();
    if (stored.length > 0) {
      dispatch({ type: ACTIONS.INITIALIZE_FAVOURITES, payload: stored });
    }
  }, []);

  // Persist favourites whenever they change.
  // We skip the very first render (empty array before hydration) by
  // tracking whether initialization has happened.
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites, initialized]);

  function toggleFavourite(id) {
    dispatch({ type: ACTIONS.TOGGLE_FAVOURITE, payload: id });
  }

  // ── Search ───────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');

  // useCallback so the handler reference is stable across renders,
  // preventing unnecessary re-renders of SearchBar.
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handler to clear search in real time
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // useMemo so the filtered list is only recomputed when
  // the photos array or the search query actually change.
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  // ── Render States ────────────────────────────────────────────────
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <>
      {/* ── Gallery toolbar ──────────────────────────────────────── */}
      <section
        aria-label="Gallery controls"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 mb-8 border-b border-divider"
      >
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
        />

        <div className="flex items-center gap-2 text-[0.68rem] tracking-[0.16em] uppercase text-muted font-medium">
          <span>Showing</span>
          <span className="font-semibold text-charcoal">{filteredPhotos.length}</span>
          <span>{filteredPhotos.length === 1 ? 'Photograph' : 'Photographs'}</span>
        </div>
      </section>

      {/* ── Empty search state ───────────────────────────────────── */}
      {filteredPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-sm mx-auto">
          <p className="font-serif text-lg font-semibold text-charcoal mb-1.5">
            No photographs found
          </p>
          <p className="text-xs text-muted mb-5 leading-relaxed">
            No works matching &ldquo;{searchQuery}&rdquo; were discovered. Try checking the photographer name.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-1.5 text-xs font-medium text-charcoal border border-divider rounded-sm
                       hover:border-charcoal transition-colors duration-150
                       focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
          >
            Clear search
          </button>
        </div>
      ) : (
        /* ── Responsive photo grid ──────────────────────────────── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={toggleFavourite}
            />
          ))}
        </div>
      )}
    </>
  );
}
