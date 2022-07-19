import {useState, useEffect} from 'react';

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState('');
  const onChange = (event) => setKeyword(event.target.value);
  const onClick = () => setValue(prev => prev + 1);
  console.log('I run all the time');
  // useEffect(function, [dependence])
  // dependence에 있는 값이 변할 때 안에 있는 함수가 실행됨
  useEffect(() => {
    console.log('I run only once.');
  }, []);
  useEffect(() => {
      console.log('I run when keyword changes');
  }, [keyword]);
  useEffect(() => {
    console.log('I run when counter changes');
}, [counter]);
useEffect(() => {
  console.log('I run when keyword & counter change');
}, [keyword, counter]);
  return (
    <div>
      <input
      value={keyword}
      onChange={onChange}
      type="text"
      placeholder='Search here...'
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
