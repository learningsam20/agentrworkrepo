# used: frontend-ui-engineering kind: skill
# used: security-and-hardening kind: skill
# used: GitHub___create_or_update_file kind: tool
import { Board, Cell, checkOutcome, getValidMoves, playMove } from './gameEngine';

// Easy: random valid move
export function chooseMove(board: Board, player: Cell, difficulty: 'easy' | 'hard' = 'hard'): number {
  const valid = getValidMoves(board);
  if (valid.length === 0) throw new Error('no moves available');
  if (difficulty === 'easy') return valid[Math.floor(Math.random() * valid.length)];
  // Hard: minimax
  const opponent: Cell = player === 'X' ? 'O' : 'X';

  function score(outcome: any, depth: number): number {
    if (!outcome) return 0;
    if (outcome.winner === player) return 10 - depth;
    if (outcome.winner === opponent) return depth - 10;
    return 0; // draw
  }

  function minimax(b: Board, turn: Cell, depth: number, alpha: number, beta: number): {bestScore:number, bestMove:number|null} {
    const outcome = checkOutcome(b);
    if (outcome) return { bestScore: score(outcome, depth), bestMove: null };
    let bestScore = -Infinity;
    let bestMove: number | null = null;
    for (const m of getValidMoves(b)) {
      const nb = playMove(b, m, turn);
      const result = minimax(nb, turn === 'X' ? 'O' : 'X', depth+1, -beta, -alpha);
      const s = -result.bestScore;
      if (s > bestScore) {
        bestScore = s;
        bestMove = m;
      }
      alpha = Math.max(alpha, s);
      if (alpha >= beta) break; // alpha-beta pruning
    }
    return { bestScore, bestMove };
  }

  const res = minimax(board, player, 0, -Infinity, Infinity);
  if (res.bestMove === null) return valid[0];
  return res.bestMove;
}
