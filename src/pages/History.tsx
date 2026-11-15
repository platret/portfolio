import { PageHead } from '../components/PageHead'
import { history } from '../content/history'
import { Path } from '../sections/Path'

export default function History() {
  return (
    <>
      <PageHead left="History" right={`${history[0].year} – ${history[history.length - 1].year}`} />
      <Path />
    </>
  )
}
