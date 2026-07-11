import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
  })

  return { scrollYProgress, progress }
}
