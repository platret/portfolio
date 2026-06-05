export function ChipstackSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 440 260" role="img" aria-label="ChipStack engine: a tetromino and its fixed-timestep game loop">
      <text className="lbl" x="16" y="26" fontSize="9">TETROMINO (S / T)</text>
      <rect className="stroke" x="40" y="40" width="34" height="34" fill="none" />
      <rect className="stroke" x="74" y="40" width="34" height="34" fill="none" />
      <rect className="stroke" x="74" y="74" width="34" height="34" fill="none" />
      <rect className="stroke" x="108" y="74" width="34" height="34" fill="none" />

      <line className="stroke" x1="40" y1="32" x2="40" y2="38" strokeWidth="0.75" />
      <line className="stroke" x1="74" y1="32" x2="74" y2="38" strokeWidth="0.75" />
      <line className="stroke" x1="40" y1="35" x2="74" y2="35" strokeWidth="0.75" />
      <text className="lbl" x="48" y="33" fontSize="9">1u</text>

      <text className="lbl" x="232" y="26" fontSize="9">FIXED-TIMESTEP LOOP</text>
      <rect className="stroke" x="232" y="36" width="92" height="34" fill="none" />
      <text className="lbl" x="278" y="56" fontSize="9" textAnchor="middle">INPUT</text>

      <rect className="stroke" x="332" y="112" width="92" height="34" fill="none" />
      <text className="lbl" x="378" y="128" fontSize="9" textAnchor="middle">FIXED STEP</text>
      <text className="lbl" x="378" y="139" fontSize="9" textAnchor="middle">accumulator</text>

      <rect className="stroke" x="232" y="188" width="92" height="34" fill="none" />
      <text className="lbl" x="278" y="208" fontSize="9" textAnchor="middle">RENDER</text>

      <path className="stroke" d="M324 53 L362 53 L362 110" fill="none" />
      <polyline className="stroke" points="358,104 362,110 366,104" fill="none" />
      <path className="stroke" d="M362 146 L362 205 L326 205" fill="none" />
      <polyline className="stroke" points="332,201 326,205 332,209" fill="none" />
      <path className="stroke" d="M250 188 L250 71" fill="none" />
      <polyline className="stroke" points="246,77 250,71 254,77" fill="none" />

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="378,112 378,90 332,90" fill="none" />
        <circle className="node" cx="378" cy="112" r="3" />
        <text x="328" y="84" fontSize="11" textAnchor="end">TICK = 1000/60 ms</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="91,74 91,128 168,128" fill="none" />
        <circle className="node" cx="91" cy="74" r="3" />
        <text x="172" y="132" fontSize="11">ROTATION = SRS + I-kicks</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="91,40 91,18 100,18" fill="none" />
        <circle className="node" cx="91" cy="40" r="3" />
        <text x="104" y="22" fontSize="11">QUEUE = 7-bag</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="232,53 200,53 200,168 16,168" fill="none" />
        <circle className="node" cx="232" cy="53" r="3" />
        <text x="16" y="164" fontSize="11">TIMING = DAS / ARR / SDF</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="278,222 278,240 282,240" fill="none" />
        <circle className="node" cx="278" cy="222" r="3" />
        <text x="286" y="244" fontSize="11">RENDER = Canvas 2D</text>
      </g>

      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="378,146 410,170 410,240 360,240" fill="none" />
        <circle className="node" cx="378" cy="146" r="3" />
        <text x="356" y="244" fontSize="11" textAnchor="end">BACKEND = none</text>
      </g>
    </svg>
  );
}
