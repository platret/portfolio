export function SmartiiMacSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 440 260" role="img" aria-label="Smartii for Mac screen-capture flow">
      <polygon className="stroke" points="40,28 52,40 40,52 28,40" />
      <text className="lbl" x="60" y="44" fontSize="9">menu bar glyph</text>

      <rect className="stroke" x="16" y="96" width="92" height="44" fill="none" />
      <text x="62" y="114" fontSize="11" textAnchor="middle">GLOBAL</text>
      <text x="62" y="128" fontSize="11" textAnchor="middle">HOTKEY</text>

      <line className="stroke" x1="108" y1="118" x2="132" y2="118" strokeWidth="1.5" />
      <polyline className="stroke" points="128,114 132,118 128,122" fill="none" />

      <rect className="stroke" x="132" y="96" width="92" height="44" fill="none" />
      <text x="178" y="121" fontSize="10" textAnchor="middle">ScreenCaptureKit</text>

      <line className="stroke" x1="224" y1="118" x2="248" y2="118" strokeWidth="1.5" />
      <polyline className="stroke" points="244,114 248,118 244,122" fill="none" />

      <rect className="stroke" x="248" y="96" width="92" height="44" fill="none" />
      <text x="294" y="114" fontSize="11" textAnchor="middle">VISION</text>
      <text x="294" y="128" fontSize="11" textAnchor="middle">MODEL</text>

      <line className="stroke" x1="340" y1="118" x2="364" y2="118" strokeWidth="1.5" />
      <polyline className="stroke" points="360,114 364,118 360,122" fill="none" />

      <rect className="stroke" x="364" y="96" width="60" height="44" fill="none" />
      <text x="394" y="114" fontSize="11" textAnchor="middle">PANEL +</text>
      <text x="394" y="128" fontSize="11" textAnchor="middle">CLIPBOARD</text>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="40,40 40,18 96,18" fill="none" />
        <circle className="node" cx="40" cy="40" r="3" />
        <text x="100" y="21" fontSize="11">UI = menu bar (LSUIElement)</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="62,140 62,180 132,180" fill="none" />
        <circle className="node" cx="62" cy="140" r="3" />
        <text x="136" y="183" fontSize="11">HOTKEY = Cmd+Shift+S</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="178,140 178,210 248,210" fill="none" />
        <circle className="node" cx="178" cy="140" r="3" />
        <text x="252" y="213" fontSize="11">GODMODE = whole screen</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="294,140 294,240 300,240" fill="none" />
        <circle className="node" cx="294" cy="140" r="3" />
        <text x="304" y="243" fontSize="11">KEYS = Keychain</text>
      </g>
    </svg>
  );
}
