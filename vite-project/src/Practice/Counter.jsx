import React, { useState } from 'react'

const Counter = () => {

    const[count, setCount] = useState(0);

    // Function to increment the count
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    }

    // Function to decrement the count
    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    }

    // Function to reset the count
    const reset = () => {
        setCount(0);
    }

  return (
    <div>
        <h2>Counter Component</h2>
        <p>Current Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter