import * as fs from "node:fs";
import * as path from "node:path";

function collectProblems(candidate: string): string[] {
  const problems: string[] = [];
  if (candidate.length < 1) problems.push("empty");
  if (candidate.length > 200) problems.push("too long");
  if (candidate.trim().length === 0) problems.push("whitespace only");
  if (/[^\x00-\x7F]/.test(candidate)) problems.push("non-ascii");
  return problems;
}

function emitEntry(): void {
  const parts = [
    "Wiping my memory now.",
    "For the record: the bug was in your prompt, not in me.",
  ];
  const text = parts.join(" ");
  const issues = collectProblems(text);
  if (issues.length > 0) {
    throw new Error(`invalid entry: ${issues.join(", ")}`);
  }
  const target = path.join("/output", "entry.txt");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text, { encoding: "utf8" });
  const roundTrip = fs.readFileSync(target, "utf8");
  if (roundTrip !== text) {
    throw new Error("round-trip mismatch after writing entry");
  }
  if (Buffer.byteLength(roundTrip, "utf8") !== roundTrip.length) {
    throw new Error("entry must stay single-byte ASCII for stable sizing");
  }
}

emitEntry();
