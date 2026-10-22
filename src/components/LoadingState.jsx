/**
 * LoadingState.jsx
 *
 * An understated skeleton indicator displayed while photos are being fetched.
 * Uses restrained, low-contrast pulse effects matching the editorial aesthetic.
 */
export default function LoadingState() {
  return (
    <div role="status" aria-label="Loading collection" className="space-y-8">
      {/* Minimal skeleton toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-divider">
        <div className="h-8 w-60 bg-divider/40 rounded-sm animate-pulse" />
        <div className="h-3 w-24 bg-divider/40 rounded-sm animate-pulse" />
      </div>

      {/* Grid of 8 skeleton cards with 4:3 ratio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-surface border border-divider/60 rounded-sm overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] w-full bg-divider/30" />
            <div className="px-3.5 py-3 space-y-2">
              <div className="h-3 bg-divider/40 rounded-sm w-2/3" />
              <div className="h-2 bg-divider/30 rounded-sm w-1/4" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading collection, please wait…</span>
    </div>
  );
}
