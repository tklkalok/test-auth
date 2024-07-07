import './App.css';
import { useEffect, useState } from 'react';
import { calculateHz } from "./helpers/calculateHz"

function App() {
  const [playerCards, setPlayerCards] = useState<string[]>(["","",""]);
  const [bankerCards, setBankerCards] = useState<string[]>(["","",""]);
  const [hz, setHz] = useState<number>(0);
  const [next, setNext] = useState<string>("");

  useEffect(()=>{
    resetCalculate();
  },[JSON.stringify(playerCards), JSON.stringify(bankerCards)])

  const updatePlayerCards = (cardIndex: number, value: string)=>{
    const newPlayerCards = [...playerCards];
    newPlayerCards[cardIndex] = value;
    setPlayerCards(newPlayerCards);
  }
  const updateBankerCards = (cardIndex: number, value: string)=>{
    const newBankerCards = [...bankerCards];
    newBankerCards[cardIndex] = value;
    setBankerCards(newBankerCards);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const target = event.currentTarget;
    const participant = target.getAttribute("data-participant");
    const cardIndexStr = target.getAttribute("data-card-index");
    if(!participant) throw new Error('participant is null')
    const cardIndex = parseInt(cardIndexStr!);
    const value = target.value;
    if(participant==='player') return updatePlayerCards(cardIndex!, value);
    else if(participant==='banker') return updateBankerCards(cardIndex!, value);
  }

  const resetCards = () => {
    setPlayerCards(["","",""]);
    setBankerCards(["","",""]);
  }

  const resetCalculate = () => {
    setHz(0);
    setNext("")
  }

  const handleCalculate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    const result = calculateHz(playerCards, bankerCards)
    const { next, sumHz } = result;
    setHz(sumHz);
    setNext(next);
  }

  return (
    <div className="App">
      <div className="playerSection">
        <div>閒</div>
        <div>牌1:  
          <input data-participant="player" data-card-index="0" onChange={handleChange} value={playerCards[0]}></input>
        </div>
        <div>牌2:  
          <input data-participant="player" data-card-index="1" onChange={handleChange} value={playerCards[1]}></input>
        </div>
        <div>牌3: 
          <input data-participant="player" data-card-index="2" onChange={handleChange} value={playerCards[2]}></input>
        </div>
        <div>已輸入閒家牌: [ {playerCards.join(',')} ]</div>
      </div>
      <div className="bankerSection">
        <div>莊</div>
        <div>牌1:  
          <input data-participant="banker" data-card-index="0" onChange={handleChange} value={bankerCards[0]}></input>
        </div>
        <div>牌2:  
          <input data-participant="banker" data-card-index="1" onChange={handleChange} value={bankerCards[1]}></input>
        </div>
        <div>牌3:  
          <input data-participant="banker" data-card-index="2" onChange={handleChange} value={bankerCards[2]}></input>
        </div>
        <div>已輸入莊家牌: [ {bankerCards.join(',')} ]</div>
      </div>
      <div>
        <button onClick={handleCalculate}>計算</button>
        <button onClick={resetCards}>清除</button>
      </div>
      <hr></hr>
      <div>結果</div>
      <div>HZ數: {hz}</div>
      <div>下鋪買: {next==='player'?'閒': next==='banker'? '莊': ''}</div>
    </div>
  );
}

export default App;
