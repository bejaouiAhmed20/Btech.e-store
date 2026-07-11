import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { MotionValue } from 'framer-motion'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BarChart3, Coffee, Code2 } from 'lucide-react'

interface Tile {
  id: string
  top: string
  insetInlineStart?: string
  insetInlineEnd?: string
  width: number
  height: number
  depth: number
  delay: number
  rotate: number
  hideOnMobile?: boolean
  content: ReactNode
}

function MobileMockup() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-2.5">
      <div className="mx-auto h-1 w-6 rounded-full bg-ink-200" />
      <div className="h-8 w-full rounded-lg bg-gradient-to-br from-primary-400 to-primary-600" />
      <div className="h-1.5 w-3/4 rounded-full bg-ink-100" />
      <div className="h-1.5 w-1/2 rounded-full bg-ink-100" />
      <div className="mt-auto h-4 w-full rounded-full bg-accent-400" />
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-10 rounded-full bg-ink-200" />
        <BarChart3 size={12} className="text-primary-500" />
      </div>
      <div className="flex flex-1 items-end gap-1.5">
        <div className="h-[40%] flex-1 rounded-sm bg-primary-200" />
        <div className="h-[70%] flex-1 rounded-sm bg-primary-400" />
        <div className="h-[55%] flex-1 rounded-sm bg-accent-400" />
        <div className="h-[90%] flex-1 rounded-sm bg-primary-600" />
        <div className="h-[65%] flex-1 rounded-sm bg-primary-300" />
      </div>
    </div>
  )
}

function BusinessCardMockup() {
  return (
    <div className="flex h-full w-full flex-col justify-between p-3">
      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-primary-600 to-accent-500" />
      <div className="flex flex-col gap-1">
        <div className="h-1.5 w-3/5 rounded-full bg-ink-300" />
        <div className="h-1 w-2/5 rounded-full bg-ink-100" />
      </div>
    </div>
  )
}

function CodeMockup() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-3">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <Code2 size={11} className="text-accent-400" />
        <div className="h-1.5 w-4/5 rounded-full bg-primary-400/70" />
      </div>
      <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
      <div className="h-1.5 w-2/3 rounded-full bg-accent-400/60" />
    </div>
  )
}

function MenuMockup() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-2">
      <Coffee size={16} className="text-primary-600" />
      <div className="h-1 w-8 rounded-full bg-ink-200" />
      <div className="h-1 w-6 rounded-full bg-ink-100" />
    </div>
  )
}

const tiles: Tile[] = [
  {
    id: 'mobile',
    top: '2%',
    insetInlineStart: '2%',
    width: 84,
    height: 130,
    depth: 20,
    delay: 0.1,
    rotate: -8,
    content: <MobileMockup />,
  },
  {
    id: 'dashboard',
    top: '-2%',
    insetInlineEnd: '4%',
    width: 130,
    height: 84,
    depth: 30,
    delay: 0.35,
    rotate: 6,
    content: <DashboardMockup />,
  },
  {
    id: 'card',
    top: '68%',
    insetInlineStart: '0%',
    width: 108,
    height: 68,
    depth: 16,
    delay: 0.55,
    rotate: 5,
    hideOnMobile: true,
    content: <BusinessCardMockup />,
  },
  {
    id: 'code',
    top: '58%',
    insetInlineEnd: '0%',
    width: 128,
    height: 84,
    depth: 26,
    delay: 0.2,
    rotate: -5,
    content: <CodeMockup />,
  },
  {
    id: 'menu',
    top: '30%',
    insetInlineStart: '-6%',
    width: 72,
    height: 72,
    depth: 22,
    delay: 0.7,
    rotate: 8,
    hideOnMobile: true,
    content: <MenuMockup />,
  },
]

function GlassTile({
  tile,
  springX,
  springY,
  dark,
  animate,
}: {
  tile: Tile
  springX: MotionValue<number>
  springY: MotionValue<number>
  dark?: boolean
  animate: boolean
}) {
  const x = useTransform(springX, (v) => v * tile.depth)
  const y = useTransform(springY, (v) => v * tile.depth)

  return (
    <motion.div
      style={{
        top: tile.top,
        insetInlineStart: tile.insetInlineStart,
        insetInlineEnd: tile.insetInlineEnd,
        width: tile.width,
        height: tile.height,
        x,
        y,
      }}
      className={`absolute overflow-hidden rounded-2xl border shadow-lift backdrop-blur-xl ${
        tile.hideOnMobile ? 'hidden sm:block' : ''
      } ${dark ? 'border-white/10 bg-ink-900/90' : 'border-white/70 bg-white/80'}`}
      initial={{ opacity: 0, scale: 0.8, rotate: tile.rotate }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: tile.rotate,
        translateY: animate ? [0, -14, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.6, delay: tile.delay },
        scale: { duration: 0.6, delay: tile.delay },
        translateY: { duration: 5 + tile.depth / 10, repeat: Infinity, ease: 'easeInOut', delay: tile.delay },
      }}
    >
      {tile.content}
    </motion.div>
  )
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '200px 0px 200px 0px' })
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const springX = useSpring(mvX, { stiffness: 120, damping: 20, mass: 0.4 })
  const springY = useSpring(mvY, { stiffness: 120, damping: 20, mass: 0.4 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mvX.set((event.clientX - rect.left) / rect.width - 0.5)
    mvY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1200 }}
      className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[440px]"
    >
      {/* Central browser / laptop mockup */}
      <motion.div style={{ rotateX, rotateY }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[78%] max-w-[320px] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lift">
          <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ms-2 h-3.5 flex-1 rounded-full bg-white" />
          </div>
          <div className="flex flex-col gap-3 p-5">
            <div className="h-20 w-full rounded-xl bg-gradient-to-br from-primary-100 via-primary-200 to-accent-100" />
            <div className="h-2 w-3/4 rounded-full bg-ink-200" />
            <div className="h-2 w-1/2 rounded-full bg-ink-100" />
            <div className="mt-1 h-7 w-24 rounded-full bg-primary-600" />
          </div>
        </div>
      </motion.div>

      {tiles.map((tile) => (
        <GlassTile
          key={tile.id}
          tile={tile}
          springX={springX}
          springY={springY}
          dark={tile.id === 'code'}
          animate={isInView}
        />
      ))}
    </div>
  )
}
