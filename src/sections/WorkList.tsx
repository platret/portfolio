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
    <section className="relative px-5 pb-16 pt-12 md:px-12 md:pb-[10vh] md:pt-[10vh]" onPointerLeave={() => setHovered(null)}>
      {site.features.map((feature, i) => (
        <FeaturedProject key={feature.id} feature={feature} flip={i % 2 === 1} />
      ))}

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
