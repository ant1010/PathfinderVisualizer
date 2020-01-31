import React, {Component} from 'react';
import './Node.css';

export default class node extends Component {
    constructor(props){
        super(props);
        this.state = {
           col:0,
           row:0,
           isWat:'node',
           isStart: false,
           isGoal: false,
           
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }
    handleClick(e){
        e.preventDefault();
        const status = this.state.isWat;
        console.log("will it null " + this.props.startNode)
        if(status === 'node'){

        if(this.props.startNode !== null && this.props.goalNode !== null ){
            this.setState({isWat:'wallNode'})
            this.props.incrementCount('node',this.props.row,this.props.col);
            return;
        }
       else if( (this.props.goalNode === null && this.props.startNode === null) || (this.props.goalNode !== null && this.props.startNode === null)){
           this.setState({isWat:'startNode'});
           this.props.incrementCount('startNode',this.props.row,this.props.col);
           return;
        }
        else if(this.props.goalNode === null && this.props.startnode !== null){
            this.setState({isWat:'goalNode'});
            this.props.incrementCount('goalNode',this.props.row,this.props.col);
            return;
        }
        
       
    }
    if(status !== 'node'){
        this.props.decrementCount(this.state.isWat,0,0);
        this.setState({isWat:'node'});
        return;
    }
    }
        handleDoubleClick(e){
            e.preventDefault();
            const status = this.state.isWat;
            this.setState({isWat:"hello"});
           
            if(status === 'node'){
               this.setState({isWat:'node-goal'});
               this.props.incrementCount();
            }
            if(status !== 'node'){
                this.setState({isWat:'node'});
                this.props.decrementCount();
               
            }
    
    }
    render(){
        const test = this.props.row;
        
        
        
        return <div className={`node ${this.state.isWat}`} onDoubleClick={this.handleDoubleClick} onClick = {this.handleClick}></div>;
    }
}