import styled from 'styled-components';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <div style={{ fontSize: '50px' }}>{count}</div>
      <StyledButton
        value="-"
        onClick={() => {
          setCount((count) => count - 1);
          setCount((count) => count - 1);
          setCount((count) => count - 1);
        }}
      >
        -
      </StyledButton>
      <StyledButton
        value="0"
        onClick={() => {
          setCount(0);
        }}
      >
        0
      </StyledButton>
      <StyledButton
        value="+"
        onClick={() => {
          setCount((count) => count + 1);
          setCount((count) => count + 1);
          setCount((count) => count + 1);
        }}
      >
        +
      </StyledButton>
    </div>
  );
}

export default App;

const StyledButton = styled.button`
  background-color: #8af;
  border-radius: 5px;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 30px;
  margin-left: 20px;
`;
