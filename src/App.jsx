/**
 * App.jsx
 *
 * Root application component. Defines the page layout:
 *   - Header with FRAME branding and tagline.
 *   - Editorial heading + description.
 *   - The Gallery (all data logic lives inside Gallery).
 *   - Minimal footer.
 *
 * This component is deliberately thin — it owns no data state.
 */
import Gallery from './components/Gallery.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans overflow-x-hidden">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="border-b border-divider">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-[1.35rem] font-serif font-bold tracking-[0.06em]">
              FRAME
            </a>
            <span className="hidden sm:block w-px h-4 bg-divider" aria-hidden="true" />
            <span className="hidden sm:block text-[0.6rem] tracking-[0.22em] uppercase text-muted font-medium leading-none">
              Photographic Journal
            </span>
          </div>

          <span className="text-[0.6rem] tracking-[0.16em] uppercase text-muted/60 font-medium">
            Collection
          </span>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-12">
        {/* Editorial hero */}
        <section className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-12">
          <div className="max-w-lg">
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-muted font-semibold mb-4">
              Curated Collection
            </p>
            <h2 className="text-[1.85rem] sm:text-[2.5rem] font-serif font-semibold leading-[1.12] tracking-[-0.015em]">
              The world, through
              <br />
              another lens.
            </h2>
          </div>
          <p className="text-muted text-[0.85rem] leading-[1.7] max-w-xs pb-1">
            A hand-picked selection of photographs from
            talented artists around the globe. Save your
            favourites and revisit them anytime.
          </p>
        </section>

        {/* Gallery (owns all data fetching / state) */}
        <Gallery />
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-divider">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.65rem] tracking-[0.04em] text-muted/60">
          <span>&copy; {new Date().getFullYear()} Frame</span>
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 decoration-divider hover:text-charcoal transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal/30 focus-visible:rounded-sm"
          >
            Images via Picsum Photos
          </a>
        </div>
      </footer>
    </div>
  );
}
