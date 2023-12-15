import React, { useState } from 'react';

function DropDown({ supIndex, onClick, options, text}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const onClickLocal = (elem, index) => {
    onClick(elem, index);
    setExpanded(false);
  }

  return (
    <div className="nav-item dropdown">
      <button className="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true" onClick={toggleExpanded} >{text}</button>
      {expanded && (
        <ul className="boton-expandible-lista" style={{zIndex: 1}}>
          {options.map((elem, index) => {
            return (
              <div className="btn-group-vertical" key={index}>
                <button  type="button" className="dropdown-item" onClick={() => onClickLocal(elem, supIndex)}>{elem.name || elem}</button>
              </div>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default DropDown;