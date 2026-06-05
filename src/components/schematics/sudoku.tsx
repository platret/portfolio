export function SudokuSchematic() {
  return (
    <svg className="schematic" viewBox="0 0 440 260" role="img" aria-label="KillerSudoku constraint solver over a sudoku section">
      <rect className="stroke" x="40" y="40" width="150" height="150" fill="none" strokeWidth="2" />
      <line className="stroke" x1="90" y1="40" x2="90" y2="190" strokeWidth="1" />
      <line className="stroke" x1="140" y1="40" x2="140" y2="190" strokeWidth="1" />
      <line className="stroke" x1="40" y1="90" x2="190" y2="90" strokeWidth="1" />
      <line className="stroke" x1="40" y1="140" x2="190" y2="140" strokeWidth="1" />
      <rect className="stroke" x="90" y="90" width="50" height="50" fill="none" strokeWidth="2" strokeDasharray="4 3" />
      <text x="58" y="71" fontSize="11" textAnchor="middle">5</text>
      <text x="165" y="71" fontSize="11" textAnchor="middle">3</text>
      <text x="115" y="171" fontSize="11" textAnchor="middle">7</text>
      <text x="115" y="30" className="lbl" fontSize="9" textAnchor="middle">3x3 BOX SECTION</text>
      <path className="stroke" d="M 360 200 a 22 7 0 0 0 44 0 l 0 -26 a 22 7 0 0 0 -44 0 Z" fill="none" strokeWidth="1.5" />
      <path className="stroke" d="M 360 174 a 22 7 0 0 0 44 0" fill="none" strokeWidth="1.5" />
      <text x="382" y="225" className="lbl" fontSize="9" textAnchor="middle">DB</text>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="115,115 230,115 230,108" />
        <circle className="node" cx="115" cy="115" r="3" />
        <text x="234" y="111" fontSize="11">SEARCH = MRV backtracker</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="190,55 230,55" />
        <circle className="node" cx="190" cy="55" r="3" />
        <text x="234" y="59" fontSize="11">RESULT = provably unique</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="65,140 65,225 230,225" />
        <circle className="node" cx="65" cy="140" r="3" />
        <text x="234" y="229" fontSize="11">TESTS = 54 / 54</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="382,174 382,150 230,150" />
        <circle className="node" cx="382" cy="174" r="3" />
        <text x="234" y="154" fontSize="11">STORE = better-sqlite3 (WAL)</text>
      </g>
      <g className="callout" tabIndex={0}>
        <polyline className="lead" points="190,90 230,90" />
        <circle className="node" cx="190" cy="90" r="3" />
        <text x="234" y="94" fontSize="11">AUTH = bcrypt</text>
      </g>
    </svg>
  );
}
