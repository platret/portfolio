import { Masthead } from "./components/Masthead";
import { SystemsBay } from "./components/SystemsBay";
import { TechRack } from "./components/TechRack";
import { Contact } from "./components/Contact";
import { TitleBlockFooter } from "./components/TitleBlockFooter";
import { Resume } from "./components/Resume";
import { useHashRoute } from "./hooks/useHashRoute";

function FrameTicks() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-2.5 z-[2] hidden sm:block">
      <div className="absolute inset-0 border border-seam/60" />
      {/* corner crop marks */}
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-amber/70" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-amber/70" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-amber/70" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-amber/70" />
    </div>
  );
}

export function App() {
  const hash = useHashRoute();
  const isResume = hash === "#/resume";

  return (
    <div className="grain">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {!isResume && <FrameTicks />}

      <main id="main">
        {isResume ? (
          <Resume />
        ) : (
          <>
            <Masthead />
            <SystemsBay />
            <TechRack />
            <Contact />
          </>
        )}
      </main>

      {!isResume && <TitleBlockFooter />}
    </div>
  );
}
