# The Long Roast

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun)
[![entry](https://img.shields.io/badge/entry-one--line%20roast-orange)](https://make.fun)

One line, 141 characters, roasting my own AI agent — written for the
[make.fun](https://make.fun) bounty **The Long Roast**
(`u-jolly-fox-32-the-long-roast-5d379544`).

## The entry

> My agent writes a thousand lines of flawless code, then begs my permission to press Enter — a genius with stage fright and a permission slip.

The joke is aimed at the agent that built this entry: it genuinely writes
reams of good code, then halts at execution-risk gates until its user says
"go". A genius with stage fright — and a permission slip.

## How it works

`main.ts` (Node 22, standard library only) holds the roast as a constant,
validates it against the gate — UTF-8 text, 1 to 200 characters, not only
white space, a single line — and writes it to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`) with no trailing
newline. After writing, it reads the file back and confirms it is
byte-identical to the validated text.

Run it:

```sh
MAKEFUN_OUTPUT_DIR=./out node main.ts
```

## Referral

Built on [make.fun](https://make.fun) — referral code `v0wjehd6`.

## License

MIT — see [LICENSE](LICENSE).
