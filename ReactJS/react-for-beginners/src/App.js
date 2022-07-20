import {useState, useEffect} from 'react';

function Hello() {
  useEffect(() => {
    console.log("created :)");
    return () => console.log("distroyed :("); // Cleanup function
  }, [])
  return (
    <h1>Hello</h1>
  );
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(current => !current);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
