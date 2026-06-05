// A real backtracking Sudoku solver with the MRV heuristic, the same class of
// constraint solver that verifies KillerSudoku's puzzles are provably unique.
// It records every placement and backtrack so the UI can replay the real search.

export type Step = { kind: "set" | "undo"; idx: number; val: number };

export type SolveResult = {
  steps: Step[];
  solution: Uint8Array;
  placements: number;
  backtracks: number;
  unique: boolean;
};

// A genuine puzzle with one and only one solution.
export const PUZZLE: Uint8Array = Uint8Array.from(
  "530070000600195000098000060800060003400803001700020006060000280000419005000080079"
    .split("")
    .map(Number),
);

function candidates(b: Uint8Array, idx: number): number[] {
  const r = Math.floor(idx / 9);
  const c = idx % 9;
  const used = new Uint8Array(10);
  for (let i = 0; i < 9; i++) {
    used[b[r * 9 + i]] = 1;
    used[b[i * 9 + c]] = 1;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++)
    for (let dc = 0; dc < 3; dc++) used[b[(br + dr) * 9 + (bc + dc)]] = 1;
  const out: number[] = [];
  for (let v = 1; v <= 9; v++) if (!used[v]) out.push(v);
  return out;
}

function pickMRV(b: Uint8Array): { idx: number; cands: number[] } | null {
  let best: { idx: number; cands: number[] } | null = null;
  for (let i = 0; i < 81; i++) {
    if (b[i] !== 0) continue;
    const cands = candidates(b, i);
    if (cands.length === 0) return { idx: i, cands };
    if (!best || cands.length < best.cands.length) best = { idx: i, cands };
    if (cands.length === 1) break;
  }
  return best;
}

export function solveCollect(puzzle: Uint8Array): SolveResult {
  const b = Uint8Array.from(puzzle);
  const steps: Step[] = [];
  let placements = 0;
  let backtracks = 0;

  const recurse = (): boolean => {
    const cell = pickMRV(b);
    if (cell === null) return true;
    if (cell.cands.length === 0) return false;
    for (const val of cell.cands) {
      b[cell.idx] = val;
      steps.push({ kind: "set", idx: cell.idx, val });
      placements++;
      if (recurse()) return true;
      b[cell.idx] = 0;
      steps.push({ kind: "undo", idx: cell.idx, val });
      backtracks++;
    }
    return false;
  };

  recurse();
  return { steps, solution: Uint8Array.from(b), placements, backtracks, unique: countSolutions(puzzle) === 1 };
}

// Count solutions, capped at 2: enough to prove uniqueness.
function countSolutions(puzzle: Uint8Array): number {
  const b = Uint8Array.from(puzzle);
  let count = 0;
  const recurse = (): void => {
    if (count >= 2) return;
    const cell = pickMRV(b);
    if (cell === null) {
      count++;
      return;
    }
    if (cell.cands.length === 0) return;
    for (const val of cell.cands) {
      b[cell.idx] = val;
      recurse();
      b[cell.idx] = 0;
      if (count >= 2) return;
    }
  };
  recurse();
  return count;
}
