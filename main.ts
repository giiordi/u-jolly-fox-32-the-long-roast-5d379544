// The Long Roast — entry program (Node 22, stdlib only).
//
// Writes one line roasting the entrant's own AI agent to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), with no trailing
// newline. The sealed gate requires UTF-8 text of 1 to 200 characters,
// not only white space.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast. My agent writes reams of flawless code, then stops dead and
// asks my permission to press Enter: a genius with stage fright and a
// permission slip. Specific to the agent that built this entry, which
// genuinely does halt at execution-risk gates until its user says "go".
const ROAST =
  "My agent writes a thousand lines of flawless code, then begs my permission to press Enter \u2014 a genius with stage fright and a permission slip.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const text = ROAST;

// Gate: 1 to 200 characters, not only white space.
const chars = [...text];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  fail(`entry is ${chars.length} characters, must be 1 to ${MAX_CHARS}`);
}
if (text.trim().length === 0) {
  fail("entry is only white space");
}
if (text.includes("\n") || text.includes("\r")) {
  fail("entry must be a single line");
}

// Gate: valid UTF-8 round-trips through an encoder without replacement.
const encoded = new TextEncoder().encode(text);
if (new TextDecoder("utf-8", { fatal: true }).decode(encoded) !== text) {
  fail("entry is not valid UTF-8 text");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, encoded);

// Read back what landed on disk and confirm it is byte-identical, so a
// silent write failure can never pass as a valid entry.
const onDisk = readFileSync(outPath);
if (!onDisk.equals(Buffer.from(encoded))) {
  fail(`written file at ${outPath} does not match the entry text`);
}
console.log(
  `wrote ${chars.length} characters (${encoded.length} bytes) to ${outPath}`,
);
