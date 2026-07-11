import { motion } from 'framer-motion'
import btechLogo from '@/assets/images/btech_logo.png'

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-white"
    >
      <motion.img
        src={btechLogo}
        alt="BTech"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: [1, 0.7, 1], y: 0, scale: 1 }}
        transition={{ opacity: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 0.4 }, scale: { duration: 0.4 } }}
        className="h-16 w-auto object-contain"
      />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-ink-100">
        <motion.div
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary-600 to-accent-500"
          animate={{ x: ['-100%', '220%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
