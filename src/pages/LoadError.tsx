import { PageHead } from '../components/PageHead'
import { Link } from '../router/router'

const LINK = 'inline-flex min-h-11 items-center border-b border-paper/40 transition-[color,border-color] duration-[600ms] ease-out-expo hover:border-paper'

/** Shown in place of a page whose code did not arrive (offline, a blocked file, a deploy in between)
 *  or that failed to render. Ships in the entry chunk, so it can always be drawn. */
export default function LoadError() {
  return (
    <>
      <PageHead left="Error" right="Not loaded" title={['This page', 'did not load.']} />
      <div className="px-5 pb-16 pt-10 md:px-12 md:pb-[10vh] md:pt-14">
        <p className="max-w-[46ch] text-xs leading-[1.9] text-paper/70 md:text-sm">Part of the site could not be loaded. Check the connection and try again.</p>
        <ul className="mt-8 flex flex-col items-start gap-x-10 gap-y-2 text-xs sm:flex-row">
          <li>
            <button type="button" onClick={() => window.location.reload()} data-cursor="hover" className={LINK}>
              Reload the page
            </button>
          </li>
          <li>
            <Link to="/" data-cursor="hover" className={LINK}>
              Go to the home page
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
