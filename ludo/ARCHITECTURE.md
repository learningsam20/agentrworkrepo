# used: mcp_GitHub.create_or_update_file kind: tool

ARCHITECTURE.md

Overview
--------
This document describes the architecture for the ludo/ single-page Ludo demo added to this repository. The goal is a simple, single-user, client-side implementation suitable for rapid iteration and later expansion.

Components
----------
- index.html
  - Single-page application containing minimal HTML, inline CSS, and inline JavaScript.
  - Can be split into separate css/ and js/ files in future iterations.

- Game Model (in JS)
  - State:
    - turnIndex: index of current player in COLORS array.
    - dice: last rolled value or null.
    - tokens: per-color arrays of 4 integers representing positions (-1 yard, 0..51 track, 52+ reserved for home path simplified).
  - Functions:
    - initState(): initialize game state.
    - rollDice(): produce dice result and trigger AI actions as needed.
    - tryMove(col, idx, steps): attempt to move a token and handle captures.
    - canMove(...), advanceTurn(), aiPlayTurn() — helpers for gameplay.

- UI
  - Board grid (15x15 CSS grid) for visual framing.
  - Token list and simple controls placed as overlays for interaction.
  - Messages and dice indicator.

Design decisions / tradeoffs
---------------------------
- Single file: prioritized speed of delivery over modularity.
- Simplified rules: implemented a playable game quickly. Full Ludo rules (safe squares, exact home entry) omitted for initial demo.
- AI: simple randomized legal moves; easy to improve later.

Extensibility
-------------
- Move JS into ludo/js/app.js and CSS into ludo/css/app.css to improve maintainability.
- Implement full board mapping and token placement on exact cells for better UX.
- Add unit tests for game logic and GitHub Actions workflow for CI.

Security & Privacy
------------------
- No external network calls or third-party libraries used.
- Static assets only.

