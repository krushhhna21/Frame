import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * useFetchPhotos
 *
 * Custom hook that fetches 30 photos from the Picsum API on mount.
 *
 * Returns { photos, loading, error, refetch }.
 *
 * - `photos`  : array of photo objects (empty while loading or on error).
 * - `loading` : boolean, true while a request is in-flight.
 * - `error`   : string | null, a human-readable error message.
 * - `refetch` : function to retry the fetch (used by ErrorState).
 *
 * Cleanup: uses an AbortController so that if the component unmounts
 * before the fetch resolves, the request is aborted and stale
 * setState calls are avoided.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // A counter that increments on every refetch to re-trigger the effect.
  const [fetchKey, setFetchKey] = useState(0);

  // Track whether the component is still mounted to avoid state updates
  // after unmount (belt-and-suspenders alongside AbortController).
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format from the API.');
        }

        if (mountedRef.current) {
          setPhotos(data);
          setLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') return; // component unmounted
        if (mountedRef.current) {
          setError(err.message || 'An unknown error occurred.');
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, [fetchKey]);

  function refetch() {
    setFetchKey((k) => k + 1);
  }

  return { photos, loading, error, refetch };
}
