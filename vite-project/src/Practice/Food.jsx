import React from 'react'
import { useState } from 'react';

const Food = () => {
  const[inputValue, setInputValue] = useState("");
  const[food, setFood] = useState([]); 
  const[isEditing, setIsEditing] = useState(false);
  const[editIndex, setEditIndex] = useState(null);
  const[searchTerm, setSearchTerm] = useState("");

  const addFood = () => {
    if(inputValue.trim() === "") return;
    if(isEditing) {
      const updatedTodos = [...food];
      updatedTodos[editIndex] = inputValue;
      setFood(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);}
      else{
    setFood((prev) => [...prev, inputValue]);
      }
    setInputValue("");
  }

  const deletefood = (index) => {
    const newFood = food.filter((_, i) => i !== index);
    setFood(newFood);
  }

  const filteredFood = food.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
  <div>
    <input type="text" onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} onClick={filteredFood} />
      <h1>Food Component</h1> 
      {filteredFood.map((item, index) => (
        <div key={index}>
          <p>{item}</p> 
          <button onClick={() => {setInputValue(item); setIsEditing(true); setEditIndex(index)}}>Edit</button>
          <button onClick={()=>deletefood(index)}>Delete</button>
          </div>
          ))  
}
      <input type="text" value={inputValue} placeholder="Search for food..." onChange={(e)=> setInputValue(e.target.value)} />
      <button onClick={addFood}>{isEditing ? "Update" : "Add"}</button>
   </div>
  )
}

export default Food