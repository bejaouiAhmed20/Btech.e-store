import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'

export function ContactIllustration() {
  return (
    <div className="relative mx-auto flex h-full min-h-[360px] w-full max-w-md items-center justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary-100 via-accent-50 to-transparent blur-2xl" />

      {/* Central card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-64 flex-col gap-4 rounded-3xl border border-white bg-white/80 p-6 shadow-lift backdrop-blur-xl"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
          <Send size={20} />
        </span>
        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-3/4 rounded-full bg-ink-200" />
          <div className="h-2.5 w-full rounded-full bg-ink-100" />
          <div className="h-2.5 w-5/6 rounded-full bg-ink-100" />
        </div>
        <div className="h-9 w-28 rounded-full bg-primary-600" />
      </motion.div>

      {/* Floating chat bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={{ y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.2 },
          scale: { duration: 0.6, delay: 0.2 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
        }}
        className="absolute -top-4 start-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white/70 text-accent-600 shadow-lift backdrop-blur-xl"
      >
        <MessageSquare size={24} />
      </motion.div>

      {/* Floating mail bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        animate={{ y: [0, 16, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.35 },
          scale: { duration: 0.6, delay: 0.35 },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
        }}
        className="absolute bottom-2 end-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white/70 text-primary-600 shadow-lift backdrop-blur-xl"
      >
        <Mail size={20} />
      </motion.div>
    </div>
  )
}
