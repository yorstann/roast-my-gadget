import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "One-Line Roast: The Gadget You
// Use Every Day" bounty. The program writes a single roast line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt).
// Pass 2 (final): the earbuds line. Anyone who owns wireless
// earbuds knows the asymmetry — one bud always near death, the
// other nearly full — and the marriage metaphor names it exactly:
// a partnership where only one of them ever charges. Concrete
// numbers (4% vs 87%) keep it one person's specific gripe rather
// than a generic complaint. It replaces the pass-1 smartwatch
// draft, whose charger hunt was a more familiar gadget gripe.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the line.
const LINE_BEATS = [
  "My left earbud is always at 4% while the right one sits at 87%",
  "— a marriage where only one of them ever charges.",
] as const;

export function buildEntryLine(): string {
  return LINE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
