import { Component, type ReactNode } from 'react'
import LoadError from '../pages/LoadError'

/** Catches an error while a page renders, so one broken page shows an error page in place
 *  instead of unmounting the whole site. The shell gives it a new key on every page change. */
export class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <LoadError /> : this.props.children
  }
}
