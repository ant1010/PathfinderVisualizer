import React, {Component} from 'react';
import './PathfindingVisualizer.css';

export default class PathfinderAlgorithms  extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            Data: {startNode:{row:0,col:0},goalNode:{row:0,col:0}, wallNode:[0]}
        }
        this.handleClick = this.handleClick.bind(this);
        this.algoOne = this.algoOne.bind(this);
    }
    componentDidMount(){
        console.log(this.state.testData);
        this.setState({Data:this.props.gridData});
        
    }
    handleClick = () =>{
        if(this.props.gridData){
       this.setState({Data:this.props.gridData},function(){console.log(this.state);});
       
       

        }
       this.algoOne();
    }


    algoOne(){
    console.log(this.props.gridData.wallNode)
    const node = this.props.gridData.wallNode[1];
    
    }
    
    render() {

        let start = this.state.Data.startNode;
        let goal = this.state.Data.goalNode;
        
      
       
        const test = 9;

        return (
           
            <div>
                <button onClick={this.handleClick} >
                </button>
              
               
            </div>
        );

    }
}
