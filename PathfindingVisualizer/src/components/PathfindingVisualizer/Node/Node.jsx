import React, {Component,useEffect} from 'react';
import './Node.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export default class node extends Component {
    constructor(props){
        super(props);
        this.state = {
           col:0,
           row:0,
           isWat:'',
           isGoal: false,
           
           
        };
        this.handleClick = this.handleClick.bind(this)
        
        
    }

    componentDidMount(){
       
       this.setState({isWat:this.props.isWat});
        
    }
    handleMouseDown = (node) =>
    {
        
    
       
       this.props.handleMouseDown(node);
    
        

    }
    handleMouseUp = (e) => 
    {
        
        
       
        this.props.handleMouseUp();
        
        
        

    }
    handleMouseEnter = (node) => 
    {
      
        this.props.handleMouseEnter(node);
    }
     update(){
        
         if(this.state.isWat != "pathNode"){
        this.setState({isWat:'progressPathNode'});
         }
     }
    handleClick = (e)=> {
        
      
        const status = this.state.isWat;
        const row = this.props.row;
        const col = this.props.col;
        const node = this.props.node;

        
        if(status === 'node'){ //Node clicked-on is blank/free node

            //Start node and Goal node are both already chosen
        if(this.props.startNode !== null && this.props.goalNode !== null ){ 
            this.setState({isWat:'wallNode'})
            this.props.incrementCount('wallNode',node);
            return;
        }
        //either goal node and start node have yet to be chosen or goal node is chosen but the start node is blank
        if( (this.props.goalNode === null && this.props.startNode === null) || (this.props.goalNode !== null && this.props.startNode === null)){
           this.setState({isWat:'startNode'});
           this.props.incrementCount('startNode',node);
           return;
        }
        //only start node chosen 
         if(this.props.goalNode === null && this.props.startNode !== null){
            this.setState({isWat:'goalNode'});
           
            this.props.incrementCount('goalNode',node);
            return;
        }
    }
        
    if(status !== 'node'){ //Node clicked-on is already defined as Start,goal, or wall node
        this.props.decrementCount(this.state.isWat,this.props.node);
        this.setState({isWat:'node'});
        
        return;
    }
   
    }
    onDoubleClick = () =>{
        console.log("hello");
        this.setState({isWat:'weightNode'});
        this.props.incrementCount('weightNode',this.props.node);
        return;
    }
   
    render(){
        let nodeClass = "node";
        if(isMobile){
            nodeClass = "nodeMobile";
        }
       const node = this.props.node;
       
        return <div className={`${nodeClass} ${this.props.isWat}`}  id = {this.props.node.id} onMouseEnter = { () => this.handleMouseEnter(node)}onClick={ this.handleClick}onDoubleClick={this.onDoubleClick}></div>;
    }
}