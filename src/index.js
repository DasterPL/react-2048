import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Game from './components/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
const hueValue = Math.floor(Math.random() * 360);
document.body.style.setProperty('--hue-value', hueValue);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);