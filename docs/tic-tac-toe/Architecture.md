# used: documentation-and-adrs kind: skill
# used: api-and-interface-design kind: skill
# used: security-and-hardening kind: skill
# used: GitHub___create_or_update_file kind: tool

# Tic-Tac-Toe Architecture

## Goals
- Provide a clear, modular architecture for the Tic-Tac-Toe feature that supports:
  - Rapid local development (frontend-first, single-repo)
  - Clean separation between pure game logic and UI
  - Secure-by-design principles for future server integrations
  - Extensibility for online multiplayer or analytics

## High-level overview
The system is organized as a frontend-first single-page application (React + TypeScript) containing pure game engine modules and optional server components. The initial implementation is frontend-only and runs in the browser; the architecture enables adding a small backend later without major refactors.

Components
- Client (browser SPA)
  - UI layer (React components)
  - Game Engine (pure, deterministic logic)
  - AI Engine (minimax implementation)
  - Persistence adapter (localStorage) — optional for session scores
  - Network adapter (optional) — abstract interface for online play
- (Optional) Server
  - REST or WebSocket API for matchmaking / persistent leaderboards
  - Authentication layer (OAuth2 / JWT) if user accounts are added
  - Rate limiting and input validation

## Component responsibilities
- Game Engine (src/engine/gameEngine.ts)
  - All game rules; pure functions, fully unit-testable
  - No DOM, no randomness
- AI Engine (src/engine/ai.ts)
  - Encapsulates AI decision making; deterministic for Hard
  - Exposes difficulty parameter
- UI Components (src/*)
  - Presentation and event handling only; call into engine modules
- Persistence Adapter
  - Small module to persist session data to localStorage
  - Server-side persistence (if added) should go through a thin API client
- Network Adapter / API client
  - Abstract interface with methods: createMatch(), joinMatch(), syncState()
  - Implementation for future WebSocket-based real-time play

## Data flows
1. User action (click/keyboard) -> UI component
2. UI calls GameEngine.playMove() -> returns new board
3. UI updates state and calls checkOutcome()
4. If single-player and opponent is AI, UI calls AI.chooseMove() then plays resulting move
5. Optional: update session score to localStorage or POST to server

## Security considerations (frontend-first)
- Principle of least privilege: UI modules have no more privileges than needed.
- Input validation: Although moves are from UI, GameEngine validates moves (index range, occupancy).
- Deterministic AI: Avoid exposing secrets; AI runs client-side only in MVP.
- Storage: Only non-sensitive data (scores) stored in localStorage. If server added, never store plaintext secrets client-side.
- Server hardening: If backend is added later:
  - Use HTTPS only; HSTS and secure cookies for sessions
  - Rate limit APIs and validate inputs server-side
  - Protect WebSocket endpoints with auth tokens and CSRF mitigation where applicable

## API contracts (future server)
- REST examples (JSON):
  - POST /matches -> { mode: 'ranked'|'casual' } -> { matchId }
  - POST /matches/:id/join -> { playerId }
  - GET /matches/:id/state -> { board, playerTurn, outcome }
  - POST /analytics/event -> { eventType, payload }

- WebSocket protocol (outline):
  - Client sends: { type: 'join', matchId }
  - Server broadcasts: { type: 'state', board, turn, outcome }
  - Client sends: { type: 'move', index }

Security for API
- Require authentication (Bearer token/JWT) for match creation/joining
- Validate all incoming moves server-side by running the GameEngine logic on server to prevent cheating
- Use short-lived tokens for WebSocket auth

## Deployment & CI
- Frontend static site can be deployed to GitHub Pages, Netlify, or Vercel
- CI pipeline (GitHub Actions): install dependencies, run lint, run tests, build
- Security checks: run dependency vulnerability scan (dependabot/scan), run ESLint with security rules

## Observability
- Capture basic events (game_started, game_ended, move_made) to console or analytics endpoint
- Add unit test coverage thresholds in CI

## Extensibility and migration path
- To add online play, implement a backend that imports gameEngine.ts to validate state transitions and run authoritative checks
- To support multiple variants (NxN), parameterize engine functions (board size, win condition length)

## Diagrams (ASCII)
Client (React SPA)
+-------------------+      Optional      +----------------+
|  UI Components    | <----------------> |   Network/API  |
|  (Board, Controls)|                     |   (WebSocket)  |
+-------------------+                     +----------------+
         ^   |
         |   v
+-------------------+
|  Game Engine      |
|  AI Engine        |
+-------------------+
         |
         v
+-------------------+
|  Persistence      |
|  (localStorage)   |
+-------------------+

## Notes on testing strategy
- Unit tests for engine and AI (deterministic outcomes)
- Component tests for UI interactions
- Optional E2E for full flow

