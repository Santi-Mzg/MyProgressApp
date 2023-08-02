import React, { useState } from 'react';
import BotónExpandible from "./BotónExpandible";

function ListaExpandible() {
  const [sublistItems, setSublistItems] = useState([]);
  //const [numeroSeries, setNumeroSeries] = useState(0);

  const handleAddItem = (numeroSeries) => {
    //setNumeroSeries(5);
    const newItem = {
      series: numeroSeries,
      nestedItems: []
    };
    setSublistItems([...sublistItems, newItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...sublistItems];
    updatedItems.splice(index, 1);
    setSublistItems(updatedItems);
  };

  const handleAddNestedItem = (index) => {
    const updatedItems = [...sublistItems];
    updatedItems[index].nestedItems.push(`Repeticiones`);
    setSublistItems(updatedItems);
  };

  const handleDeleteNestedItem = (index, nestedIndex) => {
    const updatedItems = [...sublistItems];
    updatedItems[index].nestedItems.splice(nestedIndex, 1);
    setSublistItems(updatedItems);
  };

  return (
    <ul>
      <li>
        Workout
        <ul>
          {sublistItems.map((item, index) => (
            <li key={index}>
              {item.series}
              <button onClick={() => handleDeleteItem(index)}>Eliminar</button>
              <ul>
                {item.nestedItems.map((nestedItem, nestedIndex) => (
                  <li key={nestedIndex}>
                    {nestedItem}
                    <button onClick={() => handleDeleteNestedItem(index, nestedIndex)}>Eliminar</button>
                  </li>
                ))}
                <li>
                  <button onClick={() => handleAddNestedItem(index)}>Agregar</button>
                </li>
              </ul>
            </li>
          ))}
          <li>
            <BotónExpandible onClick={handleAddItem}></BotónExpandible>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default ListaExpandible;
