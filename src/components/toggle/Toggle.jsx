import React, { useState } from 'react';
import './toggle.css';

const Toggle = ({onSetIsWhite}) => {
  const [isWhite, setIsWhite] = useState(true);

  const handleToggle = () => {
    setIsWhite(!isWhite);
    onSetIsWhite(!isWhite);
  };

  return (
    <div className={`body ${isWhite ? 'toggleWhite' : ''}`}>
      <div id='toggle' className={isWhite ? 'toggleWhite' : ''} onClick={handleToggle} >
        <i className='circle'></i>
      </div>
    </div>
  );
};
export default Toggle;