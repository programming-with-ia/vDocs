import { useIsClient } from './hooks/useIsClient'

export default function Component() {
  const isClient = useIsClient()

  return <div>{isClient ? 'Client' : 'server'}</div>
}
