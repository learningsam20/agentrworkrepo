# used: frontend-ui-engineering kind: skill
# used: GitHub___create_or_update_file kind: tool
import React from 'react';
import { Board as B, Cell, newGame, playMove, checkOutcome } from '../engine/gameEngine';
import { chooseMove } from '../engine/ai';

export default function App(): JSX.Element {
  const [board, setBoard] = React.useState<B>(newGame());
  const [player, setPlayer] = React.useState<Cell>('X');
  const [singlePlayer, setSinglePlayer] = React.useState<boolean>(true);
  const outcome = checkOutcome(board);

  React.useEffect(() => {
    if (singlePlayer && player === 'O' && !outcome) {
      const m = chooseMove(board, 'O', 'hard');
      setTimeout(() => setBoard(b => playMove(b, m, 'O')), 150);
    }
  }, [board, player, singlePlayer, outcome]);

  function handleCell(i:number){
    if (outcome) return;
    if (board[i] !== null) return;
    if (singlePlayer && player === 'O') return;
    setBoard(b => playMove(b, i, player));
    setPlayer(p => p === 'X' ? 'O' : 'X');
  }

  React.useEffect(() => {
    if (outcome) {
      // no-op: modal could be shown
    }
  }, [outcome]);

  function reset(){
    setBoard(newGame());
    setPlayer('X');
  }

  return (
    <div style={{fontFamily:'sans-serif',padding:20}}>
      <h1>Tic-Tac-Toe</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,80px)',gap:8}}>
        {board.map((c,i)=> (
          <button key={i} onClick={()=>{handleCell(i); setPlayer(p=> p==='X'?'O':'X')}} aria-label={`cell-${i}`} style={{width:80,height:80,fontSize:32}}>
            {c}
          </button>
        ))}
      </div>
      <div style={{marginTop:16}}>
        <label>
          <input type="checkbox" checked={singlePlayer} onChange={e=>setSinglePlayer(e.target.checked)} /> Single player (vs AI)
        </label>
        <button onClick={reset} style={{marginLeft:12}}>New Game</button>
      </div>
      <div style={{marginTop:12}}>
        {outcome ? (outcome.winner ? <strong>{outcome.winner} wins</strong> : <strong>Draw</strong>) : <span>Turn: {player}</span>}
      </div>
    </div>
  );
}
