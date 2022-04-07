import React from 'react';
import ReactDOM from 'react-dom';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './index.css';

ReactDOM.render(
  <div>
   <Header/>
   <PathfindingVisualizer/>
 </div>,

  document.getElementById('root')
);
