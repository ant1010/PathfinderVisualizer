import React,{Component} from 'react'
import Node from './Node'
import PathfinderAlgorithms from './PathfinderAlgorithms'
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
            startNode: null,
            wallNode:null,
            gridData: {goalNode:{row:0,col:0},startNode:{row:0,col:0},wallNode:[0],}
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
    rNDOM(){
        return true;
    }
    incrementColoredNodeCount(nodeType,node){
         let count = this.state.coloredNodeCount+1;
         this.setState({coloredNodeCount:count});
         
        if(nodeType !== "wallNode"){
         
            const nodeLocation = node;
            this.setState(prevState => ({
                gridData: {
                    ...prevState.gridData,
                    [nodeType]:nodeLocation
                }
            
            }))
            this.setState({[nodeType]:1})
         
           
        }  
        if(nodeType == "wallNode")
        {
            
           this.setState(prevState => ({
               gridData: {
                   ...prevState.gridData,
                   [nodeType]:this.state.gridData.wallNode.concat([node])
               }
           }))
           console.log(this.state.gridData.wallNode);
        }
      
    }
    decrementColoredNodeCount(nodeType,node){
        
        if(nodeType == 'goalNode' || 'startNode'){
            const nodeLocation = node;
            this.setState({gridData:{[nodeType]:{col:0,row:0}}}); //change so that ony nodeType is changed not all og gridData --- FIXED
            this.setState({[nodeType]:null})
        }
        if(nodeType == 'wallNode'){
            var wallNodelist = [...this.state.gridData.wallNode];
            const nodetobeRemoved = node;
            var index = wallNodelist.indexOf(nodetobeRemoved);
                if(index !== -1){
                   wallNodelist.splice(index,1);
                   this.setState(prevState => ({
                    gridData: {
                        ...prevState.gridData,
                        ['wallNode']:wallNodelist
                    }
                }))
                
                }
console.log(this.state.gridData.wallNode)

        }
        let count = this.state.coloredNodeCount - 1;
        this.setState({coloredNodeCount:count});
        
    }
    updateGoalStartNode(nodeType, newStatus){
        this.setState({[nodeType]:newStatus});
        this.setState({gridData:{[nodeType]:newStatus}})
        
    }
    render() {
        const { grid } = this.state;
        const isStart = false;
        const isGoal = false;
        const testData1 = this.state.startNode;
        const gridD = this.state.gridData;

        return (
            <div id="tag">

                <div className="grid">
                    <div><PathfinderAlgorithms gridData={gridD} testData={testData1}></PathfinderAlgorithms></div>
                    {grid.map((row, rowIdx) => {
                        return <div className="grid-row" >
                            {row.map((node, nodeIdx) =>
                                <Node
                                    node = {node}
                                    decrementCount={this.decrementColoredNodeCount.bind(this)}
                                    incrementCount={this.incrementColoredNodeCount.bind(this)}
                                    nodeCount={this.state.coloredNodeCount}
                                    row={node.row}
                                    col={node.col}
                                    goalNode={this.state.goalNode}
                                    startNode={this.state.startNode}
                                >

                                </Node>)}
                        </div>
                    })}
                </div>

            </div>

        )

    }
}
const getInitialGrid = () => {
    const grid = []
    let id = 0
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 20; ++col) {
            currentRow.push(createNode(col, row, id));
            id++
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode = (col,row, id, isWat) => {
    return {
        row,
        col,
        isWat:'node',
        id,
        
    };
};