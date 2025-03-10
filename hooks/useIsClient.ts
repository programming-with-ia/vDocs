import { useEffect, useState } from 'react'

/**
 * Custom hook that determines if the code is running on the client side (in the browser).
 * @returns {boolean} A boolean value indicating whether the code is running on the client side.
 * @public
 * @see [Documentation](https://programming-with-ia.github.io/vDocs/hooks/use-is-client)
 * @example
 * ```tsx
 * const isClient = useIsClient();
 * // Use isClient to conditionally render or execute code specific to the client side.
 * ```
 */
export function useIsClient() {
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
