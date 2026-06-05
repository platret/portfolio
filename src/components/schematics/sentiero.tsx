export function SentieroSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 440 260" role="img" aria-label="sentiero-alpino role-gated REST permissions">
      <text className="lbl" x="24" y="34" fontSize="9">ROLES</text>
      <text className="lbl" x="296" y="34" fontSize="9">REST OPS</text>

      <rect className="stroke" x="32" y="84" width="92" height="30" fill="none" />
      <text x="78" y="103" fontSize="11" textAnchor="middle">GUEST</text>
      <rect className="stroke" x="32" y="150" width="92" height="30" fill="none" />
      <text x="78" y="169" fontSize="11" textAnchor="middle">MEMBER</text>

      <rect className="stroke" x="208" y="52" width="20" height="160" fill="none" />
      <text className="lbl" x="218" y="226" fontSize="9" textAnchor="middle">GATE</text>

      <rect className="stroke" x="296" y="50" width="112" height="22" fill="none" />
      <text x="306" y="65" fontSize="11">GET list</text>
      <rect className="stroke" x="296" y="80" width="112" height="22" fill="none" />
      <text x="306" y="95" fontSize="11">GET detail</text>
      <rect className="stroke" x="296" y="110" width="112" height="22" fill="none" />
      <text x="306" y="125" fontSize="11">POST</text>
      <rect className="stroke" x="296" y="140" width="112" height="22" fill="none" />
      <text x="306" y="155" fontSize="11">PUT</text>
      <rect className="stroke" x="296" y="170" width="112" height="22" fill="none" />
      <text x="306" y="185" fontSize="11">DELETE</text>

      <polyline className="stroke" points="124,93 162,93 162,61 208,61" fill="none" />
      <polyline className="stroke" points="124,105 174,105 174,91 208,91" fill="none" />

      <polyline className="stroke" points="124,165 196,165" fill="none" />
      <polyline className="stroke" points="218,61 296,61" fill="none" />
      <polyline className="stroke" points="218,91 296,91" fill="none" />
      <polyline className="stroke" points="218,121 296,121" fill="none" />
      <polyline className="stroke" points="218,151 296,151" fill="none" />
      <polyline className="stroke" points="218,181 296,181" fill="none" />

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="218,121 250,121" fill="none" />
        <circle className="node" cx="218" cy="121" r="3" />
        <text x="254" y="124" fontSize="11">ACCESS = role-gated CRUD</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="78,114 78,232 150,232" fill="none" />
        <circle className="node" cx="78" cy="114" r="3" />
        <text x="154" y="236" fontSize="11">TESTS = 30 / 30</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="124,165 124,212 252,212" fill="none" />
        <circle className="node" cx="124" cy="165" r="3" />
        <text x="256" y="215" fontSize="11">I18N = DE / IT / FR</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="78,84 78,46 150,46" fill="none" />
        <circle className="node" cx="78" cy="84" r="3" />
        <text x="154" y="49" fontSize="11">BUILD = none (vanilla JS)</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="352,50 352,36 360,36" fill="none" />
        <circle className="node" cx="352" cy="50" r="3" />
        <text x="356" y="39" fontSize="11" textAnchor="end">FILTERS = URL-synced</text>
      </g>
    </svg>
  );
}
