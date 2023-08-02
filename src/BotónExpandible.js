import React, { useState } from 'react';
import ListaExpandible from './ListaExpandible';

function BotónExpandible({ onClick }) {
const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="boton-expandible">
      <button type="button" className="btn btn-secondary" onClick={toggleExpanded}>Añadir Serie</button>
      {expanded && (
        <div className="boton-expandible-lista">
          <button type="button" className="btn btn-secondary" onClick={() => onClick(1)}>1</button>
          <button type="button" className="btn btn-secondary" onClick={() => onClick(2)}>2</button>
          <button type="button" className="btn btn-secondary" onClick={() => onClick(3)}>3</button>
          <button type="button" className="btn btn-secondary" onClick={() => onClick(4)}>4</button>
          <button type="button" className="btn btn-secondary" onClick={() => onClick(5)}>5</button>
          <button type="button" className="btn btn-secondary" onClick={() => onClick(6)}>6</button>
        </div>
      )}
    </div>
  );
}

export default BotónExpandible;