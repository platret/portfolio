import type { ReactElement } from "react";
import type { Project } from "@/lib/data";
import { ChipstackSchematic } from "./chipstack";
import { SudokuSchematic } from "./sudoku";
import { SmartiiSchematic } from "./smartii";
import { SmartiiMacSchematic } from "./smartii-mac";
import { SentieroSchematic } from "./sentiero";

export const schematics: Record<Project["id"], () => ReactElement> = {
  chipstack: ChipstackSchematic,
  sudoku: SudokuSchematic,
  smartii: SmartiiSchematic,
  "smartii-mac": SmartiiMacSchematic,
  sentiero: SentieroSchematic,
};
