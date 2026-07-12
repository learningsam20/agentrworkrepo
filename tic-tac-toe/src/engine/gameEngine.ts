# used: frontend-ui-engineering kind: skill
# used: GitHub___create_or_update_file kind: tool
export type Cell = 'X' | 'O' | null;

export type Board = Cell[]; // length 9

export type Outcome = { winner: Cell | null; line?: number[] } | null;

export function newGame(): Board {
  return Array(9).fill(null);
}

export function getValidMoves(board: Board): number[] {
  return board.map((c, i) => (c === null ? i : -1)).filter(i => i >= 0);
}

export function playMove(board: Board, index: number, player: Cell): Board {
  if (player === null) throw new Error('player must be X or O');
  if (index < 0 || index > 8) throw new Error('index out of range');
  if (board[index] !== null) throw new Error('cell already occupied');
  const nb = board.slice();
  nb[index] = player;
  return nb;
}

const winningLines: number[][] = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export function checkOutcome(board: Board): Outcome {
  for (const line of winningLines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  if (board.every(cell => cell !== null)) return { winner: null };
  return null;
}
