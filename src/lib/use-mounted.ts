"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `false` during SSR/prerender and `true` after hydration on the client.
 *
 * Replaces the `useEffect(() => setMounted(true))` idiom so that prerendering
 * stays deterministic (`cacheComponents`) and `react-hooks/set-state-in-effect`
 * is satisfied.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
