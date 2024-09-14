import React, { useState } from 'react';
import './toggle.css';

const Toggle = () => {
  const [isWhite, setIsWhite] = useState(false);

  const handleToggle = () => {
    setIsWhite(!isWhite);
  };

  return (
    <div className={`body ${isWhite ? 'toggleBlanco' : ''}`}>
      <div
        id='toggle'
        className={isWhite ? 'toggleBlanco' : ''}
        onClick={handleToggle}
      >
        <i className='circulo'></i>
      </div>
    </div>
  );
};
export default Toggle;