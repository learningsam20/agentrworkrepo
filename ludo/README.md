# used: mcp_GitHub.create_or_update_file kind: tool

# Ludo — single-page

This folder contains a simple single-user Ludo implementation.

Assumptions:
- Single human plays Red; three simple AIs play Green, Yellow, Blue.
- Simplified rules: 52-step circular track, tokens start in yard (-1), need a 6 to enter; capturing sends token to yard; no safe squares; home paths and exact finishing are simplified (not fully implemented).
- No external libraries. Single HTML file at index.html.

How to run: open ludo/index.html in a browser.

Design notes:
- The UI is intentionally minimal; token positions are shown as lists and clicking tokens moves them when valid.
- This is intended as a simple playable demo, not a full ruleset-correct Ludo engine.
