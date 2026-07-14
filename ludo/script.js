// Simple single-player Ludo (high-level, minimal rules)
const canvas=document.getElementById('board');
const ctx=canvas.getContext('2d');
const size=600; const cell=50;
const rollBtn=document.getElementById('roll');
const diceDiv=document.getElementById('dice');
const log=document.getElementById('log');
let state={player:[-1,-1,-1,-1], ai:[-1,-1,-1,-1], turn:'player'}; // -1 at home

function draw(){
  ctx.clearRect(0,0,size,size);
  // draw simple grid
  for(let i=0;i<12;i++){
    for(let j=0;j<12;j++){
      ctx.strokeStyle='#ddd'; ctx.strokeRect(i*cell,j*cell,cell,cell);
    }
  }
  // draw tokens as circles at positions along a simple track of 52 cells
  drawTokens(state.player,'blue');
  drawTokens(state.ai,'red');
}

function posToXY(pos){
  // map 0..51 to a simple loop around the board perimeter
  pos=pos%52;
  const side=Math.floor(pos/13); const idx=pos%13;
  if(side===0) return [idx*cell,0];
  if(side===1) return [11*cell, idx*cell];
  if(side===2) return [(11-idx)*cell,11*cell];
  return [0,(11-idx)*cell];
}

function drawTokens(arr,color){
  arr.forEach((p,i)=>{
    if(p<0) return; // at home
    const [x,y]=posToXY(p);
    ctx.beginPath(); ctx.fillStyle=color; ctx.arc(x+cell/2,y+cell/2,cell/3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white'; ctx.font='12px sans-serif'; ctx.fillText(i+1,x+cell/2-6,y+cell/2+4);
  })
}

function logMsg(m){ log.textContent = m + '\n' + log.textContent; }

function rollDice(){ return Math.floor(Math.random()*6)+1 }

rollBtn.addEventListener('click',()=>{
  if(state.turn!=='player'){logMsg('Wait for your turn'); return}
  const r=rollDice(); diceDiv.textContent=r; logMsg('You rolled '+r);
  // simple move: if any token at home and roll==6, bring out (to position 0)
  let moved=false;
  for(let i=0;i<4;i++){
    if(state.player[i]===-1 && r===6){ state.player[i]=0; moved=true; break}
  }
  if(!moved){
    // move first movable token
    for(let i=0;i<4;i++){
      if(state.player[i]>=0){ state.player[i]=(state.player[i]+r)%52; moved=true; break }
    }
  }
  draw();
  state.turn='ai';
  setTimeout(aiTurn,600);
});

function aiTurn(){
  const r=rollDice(); logMsg('AI rolled '+r); // dice not shown
  // AI simple logic: bring out if 6 else move first token
  let moved=false;
  for(let i=0;i<4;i++){
    if(state.ai[i]===-1 && r===6){ state.ai[i]=0; moved=true; break }
  }
  if(!moved){
    for(let i=0;i<4;i++){
      if(state.ai[i]>=0){ state.ai[i]=(state.ai[i]+r)%52; moved=true; break }
    }
  }
  draw(); state.turn='player';
}

draw();
