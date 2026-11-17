# AI Design Ops for Wefunder

A small working example of how I'd set up AI-assisted design at Wefunder. An agent reads two files before it builds any UI, then a set of checks decides whether the result is ready for review.

**Read it as a page:** https://priyamwada15.github.io/wefunder-ai-design-ops/

This is one card's worth of the idea. A full version would cover every component, the founder side and the legal variations between raise types.

## What's here

| Path | What it is |
|---|---|
| `GUARDRAILS.md` | The rules the agent reads before it builds. Components, the decisions tokens can't make on their own and a checklist to run before finishing. |
| `tokens.css` | An excerpt of Wefunder's own tokens, with a few proposed changes marked in comments. |
| `test/task.md` | The exact prompt each agent got: build one deal card for a made-up company. |
| `test/reference.md` | The live deal card as I measured it on wefunder.com. |
| `checks/` | The checks I ran on every output. |
| `results/` | All six outputs, with screenshots. |
| `index.html` | The page itself, served by GitHub Pages. |

## The test

Six fresh agents got the same task and the same reference. Three also got `tokens.css`. The other three got `tokens.css` and `GUARDRAILS.md`.

| | Hard-coded values | Failed checks |
|---|---|---|
| Tokens only | 14 across three cards | 19 |
| Tokens and guardrails | 1 | 2 |

The tokens-only agents used tokens wherever one existed. Everywhere else they copied today's card, so the decisions it made (weight 700 titles, all caps tags, a gray bookmark) carried straight over. With the guardrails, one run used a 50% radius on the bookmark and another missed tabular figures on the ribbon.

## Running the checks

You need Python 3 and Chrome.

```
checks/run.sh results/tokens-only/run-1.html
```

It renders the card headless and prints two things. The first is a JSON list of rendered failures: contrast under 4.5:1, text under 12px, sizes off the type scale, weights outside 400, 500 and 600, all caps, radii outside the token set, missing tabular figures, missing hover, focus or disabled states and tap targets under 40px. The second is every raw color, size or radius written outside `:root`.

Set `CHROME` if your Chrome binary has a different name. In a real setup these would move into Playwright and Stylelint and run on every pull request.

## Notes

- Plantline is made up. Inter stands in for Soehne.
- Token values come from Wefunder's public CSS. Anything I'm proposing is marked as a proposal in `tokens.css`.

Priyamwada Pandey, [priyamwada.me](https://www.priyamwada.me/)
