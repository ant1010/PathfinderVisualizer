import React,{Component} from 'react'
import Node from './Node'

import './PathfindingVisualizer.css';

const INITIAL_START_COL = 1;
const INITIAL_START_ROW = 10;
const INITIAL_GOAL_COL = 19;
const INITIAL_GOAL_ROW = 10;

export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            coloredNodeCount: 0,
            goalNode: null,
            startNode: null
        };
        this.handlenodeClick = this.handlenodeClick.bind(this);
        this.incrementColoredNodeCount = this.incrementColoredNodeCount.bind(this);
        this.decrementColoredNodeCount = this.decrementColoredNodeCount.bind(this);
        this.updateGoalStartNode = this.updateGoalStartNode.bind(this);
    }
    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid})
        const nodes = []
    }
    handlenodeClick(e)
    {
        e.preventDefault()
        

    }
    incrementColoredNodeCount(nodeType,row,col){
         let count = this.state.coloredNodeCount+1;
         this.setState({coloredNodeCount:count});
         
        if(nodeType !== 'node'){
            const location = {row,col}
            this.setState({[nodeType]:location});
        }  
    }
    decrementColoredNodeCount(nodeType,col,row){
        console.log(this.state.startNode)
        if(nodeType !== 'node'){
            this.setState({[nodeType]:null});
            
        }
        let count = this.state.coloredNodeCount - 1;
        this.setState({coloredNodeCount:count});
        
    }
    updateGoalStartNode(nodeType, newStatus){
        this.setState({[nodeType]:newStatus});
    }
    render(){
        const {grid} = this.state;
        console.log(grid)
        const isStart = false;
        const isGoal = false;

        return(
            <div className ="grid">
              {grid.map((row,rowIdx) => {
                  return <div className = "grid-row" >
              {row.map((node,nodeIdx) => 
              <Node 
              decrementCount = {this.decrementColoredNodeCount.bind(this)} 
              incrementCount = {this.incrementColoredNodeCount.bind(this)} 
              nodeCount = {this.state.coloredNodeCount}
              row = {node.row} 
              col = {node.col} 
              goalNode = {this.state.goalNode}
              startNode = {this.state.startNode}
              
              >
              </Node>)}
              </div>
              })}
            </div>
        );
    }
}
const getInitialGrid = () => {
    const grid = []
    for(let row = 0; row < 20; row++){
        const currentRow = [];
        for(let col = 0; col < 20;++col){
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode = (col,row) => {
    return {
        row,
        col,
        isStart: col === INITIAL_START_COL && row === INITIAL_START_ROW,
        isGoal: col === INITIAL_GOAL_COL && row === INITIAL_GOAL_ROW
    };
};