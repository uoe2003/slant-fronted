import { useMatches } from "react-router";

/** Metadata that routes can declare through the `handle` property. */
export interface RouteHandle {
  title?: string;
  hideBack?: boolean;
}

/** Returns the handle of the deepest matched route. Requires a data router. */
export function useRouteHandle(): RouteHandle {
  const matches = useMatches();
  return (matches.at(-1)?.handle ?? {}) as RouteHandle;
}
