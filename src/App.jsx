import React, { useState } from 'react';
import Clock from './components/clock/Clock';
import Toggle from './components/toggle/Toggle';
import Events from './components/events/Events';
import Skeleton from './components/skeleton/Skeleton';

const App = () => {
  const [currentProject, setCurrentProject] = useState('home');

  const renderProject = () => {
    switch (currentProject) {
      case 'Skeleton':
        return <Skeleton />;
      case 'Clock':
        return <Clock />;
      case 'Toggle':
        return <Toggle />;
      case 'Events':
        return <Events />;
      default:
        return <p>Selecciona un proyecto</p>;
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><button onClick={() => setCurrentProject('Skeleton')}>Skeleton</button></li>
          <li><button onClick={() => setCurrentProject('Clock')}>Clock</button></li>
          <li><button onClick={() => setCurrentProject('Toggle')}>Toggle</button></li>
          <li><button onClick={() => setCurrentProject('Events')}>Events</button></li>
        </ul>
      </nav>
      <main>
        {renderProject()}
      </main>
    </div>
  );
};
export default App;