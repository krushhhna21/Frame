/**
 * SearchBar.jsx
 *
 * A controlled search input for filtering photos by author name.
 * Designed with a refined editorial aesthetic: minimal search icon,
 * subtle border, crisp focus state, and an optional clear button.
 *
 * Props:
 *   value    — current search string (controlled by parent).
 *   onChange — callback invoked with the input's change event.
 *   onClear  — callback invoked to clear the search input.
 */
export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <label htmlFor="author-search" className="sr-only">
        Search by author
      </label>

      {/* Minimal search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted/70 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        id="author-search"
        type="text"
        placeholder="Search by photographer…"
        value={value}
        onChange={onChange}
        className="w-full pl-9 pr-9 py-2 text-xs text-charcoal bg-surface
                   border border-divider rounded-sm
                   placeholder:text-muted/50 placeholder:font-normal
                   transition-colors duration-200
                   focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
      />

      {/* Clear button when search query is active */}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search input"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted/60 hover:text-charcoal
                     transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
