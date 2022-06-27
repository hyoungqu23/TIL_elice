import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleDecreaseClick = () => {
    setCount((count) => count - 1);
  };

  const handleIncreaseClick = () => {
    setCount((count) => count + 1);
  };

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={handleDecreaseClick}>Decrease</button>
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
};

export default App;
