export function SmartiiSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 440 260" role="img" aria-label="Smartii browser assistant provider routing">
      <rect className="stroke" x="20" y="104" width="58" height="40" fill="none" />
      <text className="lbl" fontSize="9" x="49" y="128" textAnchor="middle">PAGE</text>
      <line className="stroke" x1="78" y1="124" x2="108" y2="124" />
      <rect className="stroke" x="108" y="104" width="72" height="40" fill="none" />
      <text className="lbl" fontSize="9" x="144" y="128" textAnchor="middle">SCREENSHOT</text>
      <line className="stroke" x1="180" y1="124" x2="210" y2="124" />
      <rect className="stroke" x="210" y="104" width="58" height="40" fill="none" />
      <text className="lbl" fontSize="9" x="239" y="128" textAnchor="middle">ROUTER</text>
      <line className="stroke" x1="268" y1="124" x2="330" y2="40" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="68" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="96" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="124" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="152" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="180" />
      <line className="stroke" x1="268" y1="124" x2="330" y2="208" />
      <rect className="stroke" x="330" y="32" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="44" textAnchor="middle">Gemini</text>
      <rect className="stroke" x="330" y="60" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="72" textAnchor="middle">Groq</text>
      <rect className="stroke" x="330" y="88" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="100" textAnchor="middle">OpenRouter</text>
      <rect className="stroke" x="330" y="116" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="128" textAnchor="middle">HuggingFace</text>
      <rect className="stroke" x="330" y="144" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="156" textAnchor="middle">Claude</text>
      <rect className="stroke" x="330" y="172" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="184" textAnchor="middle">ChatGPT</text>
      <rect className="stroke" x="330" y="200" width="90" height="16" fill="none" />
      <text fontSize="9" x="375" y="212" textAnchor="middle">Perplexity</text>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="49,104 49,72 16,72" />
        <circle className="node" cx="49" cy="104" r="3" />
        <text x="16" y="68" fontSize="11">SUMMON = Ctrl+Shift+S</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="239,144 239,176 84,176" />
        <circle className="node" cx="239" cy="144" r="3" />
        <text x="80" y="180" fontSize="11" textAnchor="end">KEY = stays local</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="225,144 225,204 84,204" />
        <circle className="node" cx="225" cy="144" r="3" />
        <text x="80" y="208" fontSize="11" textAnchor="end">BACKEND = none</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="253,144 253,232 84,232" />
        <circle className="node" cx="253" cy="144" r="3" />
        <text x="80" y="236" fontSize="11" textAnchor="end">VISION = auto-route</text>
      </g>
    </svg>
  );
}
