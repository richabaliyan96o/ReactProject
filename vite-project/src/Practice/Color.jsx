import React from 'react'
import { useState } from 'react';

export const Color = () => {
    const[Color , setColor] = useState("red");
    const changeColor = () => {
        setColor("blue");
    }
  return (
    <div>Color
    <div style={{ backgroundColor: Color, padding: '20px', textAlign: 'center' }}>
      <h2>Current Color: {Color}</h2>
      <button onClick={changeColor} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Change Color to Blue
      </button>
</div>
    </div>
  )
}
