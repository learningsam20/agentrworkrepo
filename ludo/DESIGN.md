# used: mcp_GitHub.create_or_update_file kind: tool

DESIGN.md

Purpose
-------
This design document captures the user-facing behavior, UI layout, and game flow for the single-page Ludo demo.

User stories
------------
- As a single user, I want to play Ludo against three simple AI opponents so I can test gameplay.
- As a user, I want a clear Roll Dice button and token controls so I can make moves.
- As a developer, I want game state in plain JS objects so I can add tests and refactor easily.

UI Layout
---------
- Board: 15x15 CSS grid simply frames the board. Future iterations will place tokens into specific cells.
- Controls overlay (top-right): Roll Dice, Dice display, Reset, message area.
- Token panel (top-left overlay): lists each color and its four tokens; tokens are clickable.

Game flow
---------
1. Game starts with all tokens in yard (-1).
2. Players take turns in order: Red (human), Green (AI), Yellow (AI), Blue (AI).
3. On human turn, player clicks Roll Dice. If roll is 6, tokens in yard may enter start. Player clicks a token to move.
4. On AI turns, dice roll and AI chooses a legal token to move.
5. Captures send the captured token back to yard (-1).
6. Win condition (future): move all tokens to final home area.

Interaction details
-------------------
- Token click handling: only enabled for the human color and when a dice value is present.
- Dice display: shows last roll; resets to '-' on certain events.

Future refinements
------------------
- Complete home paths and exact finish logic.
- Visual mapping of tokens onto board cells with animation.
- Turn history / undo feature for easier testing.

