import { useState } from "react";
import CallAPI from "./callAPI";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CallAPI />
    </div>
  );
}

export default App;
