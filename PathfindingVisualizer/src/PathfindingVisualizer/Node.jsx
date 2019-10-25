import React, {Component} from 'react';
import './Node.css';

export default class node extends Component {
    constructor(props){
        super(props);
        this.state = {
           col:0,
           row:0,
           
        };
    }
    render(){
        return <div className="node"></div>
    }
}