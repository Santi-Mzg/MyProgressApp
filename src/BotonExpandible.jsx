import React, { useState } from 'react';
//import addIcon from './img/addIconSmall.png';

function BotonExpandible({ supIndex, onClick, arrayContent, text}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const onClickLocal = (elem, index) => {
    console.log(elem +" "+ index);
    onClick(elem, index);
    setExpanded(false);
  }

  return (
    <div className="nav-item dropdown">
      <button className="nav-link dropdown-toggle show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true" onClick={toggleExpanded} >{text}</button>
      {expanded && (
        <ul className="boton-expandible-lista" style={{zIndex: 1}}>
          {arrayContent.map((elem, index) => {
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

export default BotonExpandible;