import { useState } from "react";
import { GenerateMatrix, RenderMatrix } from "./components";
import { Matrix } from "./types";
import { StoreContext } from "./store";

import "./App.css";

function App() {
  const [matrix, setMatrix] = useState<Matrix>([]);
  const [X, setX] = useState<number>(1);
  const [M, setM] = useState(1);
  const [N, setN] = useState(1);

  return (
    <>
      <StoreContext.Provider
        value={{
          M,
          N,
          X,
          matrix,
          setM,
          setN,
          setX,
          setMatrix,
        }}
      >
        {matrix.length ? <RenderMatrix /> : <GenerateMatrix />}
      </StoreContext.Provider>
    </>
  );
}

export default App;
