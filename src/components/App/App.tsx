import { useState } from 'react';

import Layers from 'components/Layers';
import Maze from 'components/Maze';
import Setup from 'components/Setup';
import Stats from 'components/Stats';
import Toolbar from 'components/Toolbar';
import cn from './App.module.scss';

const App = () => {
  const [setup, setSetup] = useState(true);

  return (
    <div className={cn.root}>
      <div className={cn.toolbar}>
        <Toolbar onNew={() => setSetup(true)} />
      </div>
      <div className={cn.main}>
        <div className={cn.content}>
          <div className={cn.contentInner}>
            {setup ? <Setup onSetup={() => setSetup(false)} /> : <Maze />}
          </div>
        </div>
        {!setup && (
          <div className={cn.sidebar}>
            <Stats />
            <Layers />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
