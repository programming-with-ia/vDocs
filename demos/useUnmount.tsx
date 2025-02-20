import { useUnmount } from './hooks/useUnmount'

export default function Component() {
  useUnmount(() => {
    // Cleanup logic here
  })

  return <div>Hello world</div>
}
