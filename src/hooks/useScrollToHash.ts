import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToId } from '@/lib/utils'

/**
 * Scrolls to the section referenced by the URL hash (e.g. `/#portfolio`) once
 * mounted. Used on the Home page so links coming from other routes (like
 * `/account` or `/login`) land on the right section, and so a hash route
 * still works after a hard refresh.
 */
export function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    // Wait a tick so the target section has actually painted.
    const timer = setTimeout(() => scrollToId(id), 80)
    return () => clearTimeout(timer)
  }, [hash])
}
