import './App.css';
import React, { useState } from 'react';
import Clock from './components/clock/Clock';
import Toggle from './components/toggle/Toggle';
import Events from './components/events/Events';
import Skeleton from './components/skeleton/Skeleton';

const App = () => {
  const [currentProject, setCurrentProject] = useState('home');
  const [isWhite, setIsWhite] = useState(true);

  const renderProject = () => {
    switch (currentProject) {
      case 'Skeleton':
        return <Skeleton />;
      case 'Clock':
        return <Clock />;
      case 'Toggle':
        return <Toggle onSetIsWhite={setIsWhite} />;
      case 'Events':
        return <Events />;
      default:
        return <p>Select a button</p>;
    }
  };

  return (
    <div className={`${isWhite ? 'container-toggleWhite' : 'container-toggleBlack'} ${currentProject} container `}>
      <h2 className='title'>Here you can click on any button you want and see my work</h2>
      <nav>
        <ul className='list'>
          <li>
            <button className={`button-list ${currentProject === 'Skeleton' ? 'active' : ''}`} onClick={() => setCurrentProject('Skeleton')} >
              Skeleton
            </button>
          </li>
          <li>
            <button className={`button-list ${currentProject === 'Clock' ? 'active' : ''}`} onClick={() => setCurrentProject('Clock')} >
              Clock
            </button>
          </li>
          <li>
            <button className={`button-list ${currentProject === 'Toggle' ? 'active' : ''}`} onClick={() => setCurrentProject('Toggle')}>
              Toggle
            </button>
          </li>
          <li>
            <button className={`button-list ${currentProject === 'Events' ? 'active' : ''}`} onClick={() => setCurrentProject('Events')}>
                Events
            </button>
          </li>
        </ul>
      </nav>
      <main>
        {renderProject()}
      </main>
    </div>
  );
};
export default App;