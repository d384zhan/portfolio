# Parked: agent cursors

Two cursor "agents" that used to edit the page live (retype a block, drag the
photo crop, rescale the name). Motion is ported from Cua's cursor motion lab.
Pulled from the site on 2026-10-06 when the design moved to the paper card.

Excluded from the build (see tsconfig.json). To revive: move these back under
src/components, render AgentCanvas instead of Card, append agents.css to
globals.css, reinstall framer-motion, and redo the fit check in AgentCanvas
for the current grid. Composition.tsx here is the props-driven version of the
page that AgentCanvas expects.
