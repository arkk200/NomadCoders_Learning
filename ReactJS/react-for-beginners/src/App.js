import {useState, useEffect} from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState('');
  const [invertValue, setInvertValue] = useState(-1); // 기본값으로 Option을 선택 안함
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers").then(response => 
      response.json()
    ).then(json => {
      setCoins(json);
      setLoading(false);
    });
  }, []);
  const onChangeMoney = (event) => setDollar(event.target.value);
  const onChangeOption = (event) => {
    if(event.target.selectedIndex > 0){ // Option이 선택되었을 때 Value를 코인 가격으로 설정
      setInvertValue(coins[event.target.selectedIndex - 1].quotes.USD.price);
    } else setInvertValue(-1); // Option이 선택되지 않았을 때 Value를 -1로 설정
  }
  return (
    <div>
      <h1>The Coins! {loading? null : `(${coins.length})`}</h1>
      {loading ? <strong>Loading</strong> :
      <div>
        <select onChange={onChangeOption}>
          <option>Select Coin</option>
          {coins.map(coin =>
            <option key={coin.id}>{coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD</option>
          )}
        </select>
      </div>}
      {invertValue !== -1 ? // Value가 -1이 아니라면 (== Option이 선택되었다면) input 보이기
        <div>
          <input type="number" value={dollar} placeholder='Write how much do you have...' onChange={onChangeMoney}/><br/>
          <input type="number" readOnly value={`${dollar / invertValue}`}/><br/>
        </div> : null
        }
    </div>
  );
}

export default App;
