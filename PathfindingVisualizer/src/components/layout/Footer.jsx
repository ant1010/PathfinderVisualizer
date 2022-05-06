import React, {Component} from 'react';
import './Footer.css';
import Node from '../PathfindingVisualizer/Node/Node';
export default class Footer extends Component{
  constructor(props) {
    super(props);
    this.state = {

        seen: false,

    }
   

}
  handlePopup = () => {
    this.setState({
     seen: !this.state.seen
    });
   };
render() {
   const node = {
        row:0,
        col:0,
        isWat:"startNode",
        id:0,
        
    };
    console.log(node.isWat);
    return  !this.state.seen?<div className="modal">
    <div className="modal_content">
    
      <span className="close" onClick={this.handlePopup}>

        &times;
        
      </span>
      <h3>Hello! </h3>
     <ul>
      <li>
        <Node isWat = {'startNode'}
        node = {node}>
      </Node> <h3>Start Node</h3>
      </li>
      <li>
        <Node isWat = {'goalNode'}
        node = {node}>
      </Node> <h3>Goal Node</h3>
      </li>
      <li>
        <Node isWat = {'wallNode'}
        node = {node}>
      </Node> <h3>Wall Node</h3>
      </li>
      <li>
        <Node isWat = {'weightNode'}
        node = {node}>
      </Node> <h3>Weighted Node</h3>
      </li>
  </ul>
      
      </div>
     
      </div>:null;
    
    
    
    

  }
}
