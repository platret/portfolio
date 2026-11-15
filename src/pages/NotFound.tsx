import { PageHead } from '../components/PageHead'
import { Link, useRoute } from '../router/router'

const LINK = 'inline-flex min-h-11 items-center border-b border-paper/40 transition-colors duration-[600ms] ease-out-expo hover:border-paper'

/** Rendered in place for unknown paths: the URL is kept. */
export default function NotFound() {
  const { pathname } = useRoute()

  return (
    <>
      <PageHead left="404" right="Not found" title={['Nothing', 'here.']} />
      <div className="px-5 pb-16 pt-10 md:px-12 md:pb-[10vh] md:pt-14">
        <p className="max-w-[46ch] break-words text-xs leading-[1.9] text-paper/70 md:text-sm">There is no page at {pathname}.</p>
        <ul className="mt-8 flex flex-col items-start gap-x-10 gap-y-2 text-xs sm:flex-row">
          <li>
            <Link to="/" data-cursor="hover" className={LINK}>
              Go to the home page
            </Link>
          </li>
          <li>
            <Link to="/apps" data-cursor="hover" className={LINK}>
              Browse all apps
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
