import { useState, useEffect } from "react";

/**
 * Custom hook to manage URL search parameters.
 * @template T - A record representing the expected search parameters.
 * @returns {{ params: T, updateSearchParams: (newParams: Partial<T>, clear?: boolean) => void, clearSearchParams: () => void }}
 * @public
 * @see [Documentation](https://programming-with-ia.github.io/vDocs/hooks/use-search-params)
 * @example
 * ```tsx
 * const { params, updateSearchParams, clearSearchParams } = useSearchParams<{ search: string, page: string }>();
 * console.log(params.search); // Get search query param
 * updateSearchParams({ search: "newQuery", page: "2" }); // Update query params
 * clearSearchParams(); // Clears all search params
 * ```
 */
export function useSearchParams<T extends Record<string, string>>() {
  /**
   * Retrieves the current search parameters from the URL.
   * @returns {T} The current search parameters as an object.
   */
  const getParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const obj: Partial<T> = {};
    searchParams.forEach((value, key) => {
      obj[key as keyof T] = value as T[keyof T];
    });
    return obj as T;
  };

  const [params, setParams] = useState<T>(getParams);

  useEffect(() => {
    /**
     * Handles the popstate event to update parameters when navigation occurs.
     */
    const handleUrlChange = () => {
      setParams(getParams());
    };

    // Override pushState and replaceState to detect SPA navigations
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);
      handleUrlChange();
      return result;
    };

    history.replaceState = function (...args) {
      const result = originalReplaceState.apply(this, args);
      handleUrlChange();
      return result;
    };

    // Listen to back/forward button
    window.addEventListener("popstate", handleUrlChange);

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  /**
   * Updates the search parameters in the URL.
   * @param {Partial<T>} newParams - The new parameters to update.
   * @param {boolean} [clear=false] - Whether to clear all existing parameters before setting new ones.
   */
  const updateSearchParams = <Params extends T>(
    newParams: Partial<Params>,
    clear: boolean = false
  ) => {
    const searchParams = clear
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value);
      }
    });
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setParams(getParams());
  };

  /**
   * Clears all search parameters from the URL.
   */
  const clearSearchParams = () => {
    window.history.pushState({}, "", window.location.pathname);
    setParams({} as T);
  };

  return { params, updateSearchParams, clearSearchParams, getParams };
}
