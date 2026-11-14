import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'
import { TOAST_EVENT } from '../lib/ui'

export function Toaster() {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null)

  useEffect(() => {
    let timer = 0
    const onToast = (e: Event) => {
      window.clearTimeout(timer)
      setMessage({ id: Date.now(), text: (e as CustomEvent<string>).detail })
      timer = window.setTimeout(() => setMessage(null), 2400)
    }
    window.addEventListener(TOAST_EVENT, onToast)
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] z-[96] flex justify-center px-5">
      <AnimatePresence>
        {message && (
          <motion.p
            key={message.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="flex items-center gap-3 rounded-full border border-paper/15 bg-[#161616]/95 px-4 py-2 text-[0.7rem] text-paper shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
