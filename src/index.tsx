import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import { RecoilRoot } from 'recoil';

import App from 'components/App';
import reportWebVitals from './reportWebVitals';
import 'styles/index.scss';

ReactGA.initialize('UA-232435856-1', {
  gaOptions: {
    storage: 'none',
    storeGac: false,
  },
});
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview(window.location.pathname);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
