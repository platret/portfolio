import { PageHead } from '../components/PageHead'
import { site } from '../content/site'
import { WorkList } from '../sections/WorkList'

// Interim page for Stage 1: the old work list under a page head.
// Stage 2 replaces it with the grouped index built from content/apps.ts.
export default function Apps() {
  return (
    <>
      <PageHead left="Apps" right={site.projects.length} title={['Apps,', 'all of them.']} />
      <WorkList />
    </>
  )
}
