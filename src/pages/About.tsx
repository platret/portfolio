import { PageHead } from '../components/PageHead'
import { site } from '../content/site'
import { About as AboutSection } from '../sections/About'
import { Now } from '../sections/Now'

export default function About() {
  return (
    <>
      <PageHead left="About" right={site.location} />
      <AboutSection />
      <Now />
    </>
  )
}
