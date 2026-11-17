# Wefunder UI guardrails (proposal)

## Before you build
- Read tokens.css. Use only those variables. No raw colors, sizes or radii in component code.
- If you need a value that isn't a token, use the closest one and list it under "Open questions" in your summary.

## Components
Button
- Primary: --primary background, --primary-foreground text, --primary-hover on hover. One per view.
- Secondary: --background, --foreground text, 1px --border.
- Quiet: text only, --foreground, underline on hover.
- All buttons: --radius-control, --text-base-size, weight 500, sentence case, 40px tall (44px on touch).
Tag
- Fill from a light palette step, one per kind of tag: --pink-a7 for funding, --purple-a7 for founder, --blue-a7 for sector, --green-a7 for traction.
- --foreground text, --text-xs-size, weight 500, --radius-tag, sentence case.
Status ribbon
- Time left and almost funded: --primary-foreground text on --destructive.
- New this week: --primary-foreground text on --success.
- Both pass 4.5:1. Don't use any other red or green.
Card
- --card background, 1px --border, --radius-card, no shadow.
- Title --text-lg-size at weight 600. Supporting text --muted-foreground.

## Rules
1. Text meets 4.5:1 contrast against its background.
2. Nothing below --text-xs-size. Sentences are --text-base-size or larger.
3. Weights 400, 500 and 600 only.
4. Amounts, counts and dates use tabular figures.
5. Every button and link has hover, focus-visible and disabled styles.
6. Sentence case. No all-caps labels, tags or buttons.
7. Say each thing once per card.

## Before you finish
Run the checklist. Fix every Blocker and Major, then list what you changed and any open questions.
