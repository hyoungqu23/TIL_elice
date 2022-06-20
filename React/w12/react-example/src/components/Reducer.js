import styled from 'styled-components';
import { useReducer } from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>Counter with useState</h1>
//       <div style={{ fontSize: '50px' }}>{count}</div>
//       <StyledButton
//         value="-"
//         onClick={() => {
//           setCount((count) => count - 1);
//           setCount((count) => count - 1);
//           setCount((count) => count - 1);
//         }}
//       >
//         -
//       </StyledButton>
//       <StyledButton
//         value="0"
//         onClick={() => {
//           setCount(0);
//         }}
//       >
//         0
//       </StyledButton>
//       <StyledButton
//         value="+"
//         onClick={() => {
//           setCount((count) => count + 1);
//           setCount((count) => count + 1);
//           setCount((count) => count + 1);
//         }}
//       >
//         +
//       </StyledButton>
//     </div>
//   );
// }

function App() {
  const countReducer = (count, action) => {
    console.log(count, action);

    // switch - case 문으로도 활용 가능
    if (action === 'UP') {
      return count + 1;
    } else if (action === 'DOWN') {
      return count - 1;
    } else if (action === 'RESET') {
      return 0;
    }
  };
  const countInitialState = 0;

  const [count, countDispatch] = useReducer(countReducer, countInitialState);

  return (
    <div>
      <h1>Counter with useReducer</h1>
      <div style={{ fontSize: '50px' }}>{count}</div>
      <StyledButton
        value="-"
        onClick={() => {
          countDispatch('DOWN');
        }}
      >
        -
      </StyledButton>
      <StyledButton
        value="0"
        onClick={() => {
          countDispatch('RESET');
        }}
      >
        0
      </StyledButton>
      <StyledButton
        value="+"
        onClick={() => {
          countDispatch('UP');
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
