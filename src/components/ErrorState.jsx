/**
 * ErrorState.jsx
 *
 * Displayed when the API request fails.
 * Presents a clear, concise editorial message and an accessible retry button
 * that invokes onRetry (wired directly to refetch in useFetchPhotos).
 *
 * Props:
 *   message — human-readable error message string.
 *   onRetry — callback to re-trigger the fetch in the custom hook.
 */
export default function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto"
    >
      <div className="w-9 h-9 rounded-full border border-divider flex items-center justify-center text-muted mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
        Unable to load collection
      </h3>

      <p className="text-xs text-muted leading-relaxed mb-6">
        {message || 'An unexpected error occurred while fetching the photographic collection.'}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2 text-xs font-medium text-ivory bg-charcoal rounded-sm
                   hover:bg-charcoal/85 active:scale-[0.98]
                   transition-all duration-150
                   focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
      >
        Retry connection
      </button>
    </div>
  );
}
