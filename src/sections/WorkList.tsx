import { useState } from 'react'
import { site } from '../content/site'
import { useIsTouch } from '../hooks/useIsTouch'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { FeaturedProject } from './FeaturedProject'
import { WorkRow } from './WorkRow'

const projects = site.projects

export function WorkList() {
  const [hovered, setHovered] = useState<number | null>(null)
  const touch = useIsTouch()
  const reducedMotion = useReducedMotion()

  return (
    <section id="work" className="relative px-5 pb-16 md:px-12 md:pb-[18vh]" onPointerLeave={() => setHovered(null)}>
      <div className="mb-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-16 md:text-xs">
        <span>02 / Selected work</span>
        <span>2026</span>
      </div>

      <FeaturedProject />

      <ul className="-mr-5 md:-mr-12">
        {projects.map((project, i) => (
          <WorkRow
            key={project.title}
            project={project}
            index={i}
            order={i}
            hovered={hovered}
            interactive={!touch && !reducedMotion}
            onEnter={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>
      <div className="hairline -mr-5 border-t md:-mr-12" />
    </section>
  )
}
