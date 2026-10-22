/**
 * PhotoCard.jsx
 *
 * Renders a single photo card inside the gallery grid.
 *
 * Props:
 *   photo       — a photo object from the Picsum API.
 *   isFavourite — whether this photo is currently favourited.
 *   onToggle    — callback to toggle the favourite state for this photo.
 *
 * Features:
 *   - 4:3 editorial aspect ratio using 800×600 derived Picsum URL.
 *   - Restrained image zoom on card hover with overflow clipping.
 *   - Clean surface styling with minimal hairline border and subtle rounded-sm corners.
 *   - Accessible heart toggle with aria-pressed, distinct filled/outlined states.
 *   - Respects reduced motion preferences.
 */
export default function PhotoCard({ photo, isFavourite, onToggle }) {
  // 800×600 provides a crisp 4:3 aspect ratio matching the container
  const imageUrl = `https://picsum.photos/id/${photo.id}/800/600`;

  return (
    <article className="group flex flex-col bg-surface border border-divider/70 rounded-sm overflow-hidden transition-colors duration-300 hover:border-muted/40 focus-within:ring-1 focus-within:ring-charcoal">
      {/* Image container with 4:3 aspect ratio and restrained hover zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-divider/30">
        <img
          src={imageUrl}
          alt={`Photograph by ${photo.author}`}
          width={800}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      {/* Caption & interaction row */}
      <div className="flex items-center justify-between px-3.5 py-3 gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-charcoal tracking-tight truncate leading-snug">
            {photo.author}
          </p>
          <p className="text-[0.62rem] tracking-[0.16em] uppercase text-muted/70 font-sans mt-0.5">
            No. {photo.id}
          </p>
        </div>

        {/* Favourite heart button */}
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photograph by ${photo.author} from favourites`
              : `Save photograph by ${photo.author} to favourites`
          }
          className="flex-shrink-0 p-2 -mr-1 rounded-full text-muted/60 transition-colors duration-200
                     hover:text-charcoal focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
        >
          {isFavourite ? (
            /* Selected state: filled deep terracotta / muted burgundy heart */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-accent transition-transform duration-200"
              aria-hidden="true"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            /* Unselected state: fine outlined heart */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4 transition-colors duration-200"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
