import { useRecoilState } from 'recoil';

import Highlight from 'components/Highlight';
import Layers from 'components/Layers';
import Maze from 'components/Maze';
import Setup from 'components/Setup';
import Stats from 'components/Stats';
import Toolbar from 'components/Toolbar';
import { setupAtom } from 'services/config';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import cn from './App.module.scss';

const App = () => {
  const [setup, setSetup] = useRecoilState(setupAtom);

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
            <Highlight />
          </div>
        )}
      </div>
      <div className={cn.footer}>
        Built with
        <Heart className={cn.heart} /> by
        <a
          href="https://camilomejia.dev/"
          className={cn.link}
          target="_blank"
          rel="noreferrer"
        >
          Camilo Mejía
        </a>
      </div>
    </div>
  );
};

export default App;
