import { useState } from 'react'
import { site } from '../content/site'
import { useIsTouch } from '../hooks/useIsTouch'
import { WorkRow } from './WorkRow'
import { WorkPreview } from './WorkPreview'

const lead = site.projects
const more = site.moreProjects
const all = [...lead, ...more]

export function WorkList() {
  const [hovered, setHovered] = useState<number | null>(null)
  const touch = useIsTouch()

  return (
    <section id="work" className="relative px-5 pb-[18vh] md:px-12" onPointerLeave={() => setHovered(null)}>
      <div className="mb-10 flex items-end justify-between text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mb-16 md:text-xs">
        <span>02 / Selected work</span>
        <span>2025 — 2026</span>
      </div>

      <ul className="-mr-5 md:-mr-12">
        {lead.map((project, i) => (
          <WorkRow
            key={project.title}
            project={project}
            index={i}
            order={i}
            hovered={hovered}
            interactive={!touch}
            onEnter={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>
      <div className="hairline -mr-5 border-t md:-mr-12" />

      <p className="mt-14 mb-6 text-[0.7rem] uppercase tracking-[0.08em] text-paper/50 md:mt-24 md:mb-8 md:text-xs">Also</p>

      <ul className="-mr-5 md:-mr-12">
        {more.map((project, i) => (
          <WorkRow
            key={project.title}
            project={project}
            index={lead.length + i}
            order={i}
            hovered={hovered}
            interactive={!touch}
            compact
            onEnter={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>
      <div className="hairline -mr-5 border-t md:-mr-12" />

      {!touch && <WorkPreview projects={all} active={hovered} />}
    </section>
  )
}
