import React, {Component} from 'react';
import './Footer.css';
import Node from '../PathfindingVisualizer/Node/Node';
export default class Footer extends Component{
render() {
   const node = {
        row:0,
        col:0,
        isWat:"startNode",
        id:0,
        
    };
    console.log(node.isWat);
    return <div className='footer'>


      <h3>Info Popup</h3>
      <Node isWat = {'node'}
        node = {node}>
      </Node>
      

    </div>

  }
}
