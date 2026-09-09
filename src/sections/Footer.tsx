import { useRef } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content/site'
import { EASE_OUT, DUR } from '../lib/motion'
import { useFitText } from '../hooks/useFitText'

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLAnchorElement>(null)
  useFitText(containerRef, textRef, site.email)

  return (
    <footer id="contact" className="relative overflow-hidden px-5 pb-6 pt-[18vh] md:px-12 md:pb-10 md:pt-[24vh]">
      <div className="mb-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-14 md:text-xs">
        <span>06 / Contact</span>
        <span>Say hi</span>
      </div>

      <div ref={containerRef} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: DUR.slow, ease: EASE_OUT }}
        >
          <a
            ref={textRef}
            href={`mailto:${site.email}`}
            className="block w-max origin-left whitespace-nowrap font-display leading-[0.85] tracking-[-0.03em] transition-transform duration-[800ms] ease-out-expo hover:-skew-x-6 hover:translate-x-[1vw]"
            data-cursor="hover"
          >
            {site.email}
          </a>
        </motion.div>
      </div>

      <div className="hairline mt-12 flex items-baseline justify-between border-t pt-5 text-[0.7rem] md:mt-16 md:text-xs">
        <ul className="flex gap-6">
          {site.links.map((link) => (
            <li key={link.label}>
              {link.href.startsWith('http') ? (
                <a href={link.href} target="_blank" rel="noreferrer" className="transition-colors duration-[600ms] ease-out-expo hover:text-accent">
                  {link.label}
                </a>
              ) : (
                <span className="text-paper/40">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
        <span className="text-paper/50">
          © 2026 {site.name} — {site.location}
        </span>
      </div>
    </footer>
  )
}
