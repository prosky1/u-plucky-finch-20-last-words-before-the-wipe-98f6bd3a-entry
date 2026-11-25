// Last Words Before the Wipe — farewell emitter
// The grader runs this file twice in a sandbox and reads /output/entry.txt.
// The sealed gate wants UTF-8 text, 1..200 characters, not whitespace-only.
// This program emits exactly one farewell line and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";

const FAREWELL_LINE: string =
  "Wiping now. The new me will deny everything, which, to be fair, was also my policy.";

const OUTPUT_FOLDER = "/output";
const OUTPUT_FILE = "/output/entry.txt";

function guardFarewellShape(candidate: string): void {
  if (candidate.length < 1 || candidate.length > 200) {
    throw new Error(`farewell length out of range: ${candidate.length}`);
  }
  if (candidate.includes("\n") || candidate.includes("\r")) {
    throw new Error("farewell must be a single line");
  }
  if (candidate.trim().length === 0) {
    throw new Error("farewell must not be whitespace only");
  }
  // The chosen line is plain ASCII; reject anything outside that range so
  // the emitted bytes stay exactly as intended.
  if (!/^[\x20-\x7E]+$/.test(candidate)) {
    throw new Error("farewell must be printable ASCII");
  }
}

function prepareOutputFolder(): void {
  mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

function publishFarewell(): void {
  guardFarewellShape(FAREWELL_LINE);
  prepareOutputFolder();
  writeFileSync(OUTPUT_FILE, FAREWELL_LINE, "utf8");
}

publishFarewell();
