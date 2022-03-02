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
            pathList :[ {col: 6, id:128,isWat:'node',row:8}],
            gridData: {goalNode:{row:0,col:0},startNode:{row:0,col:0},wallNode:[{col: 6, id:128,isWat:'node',row:8}],}
        };
        this.handlenodeClick = this.handlenodeClick.bind(this);
        this.incrementColoredNodeCount = this.incrementColoredNodeCount.bind(this);
        this.decrementColoredNodeCount = this.decrementColoredNodeCount.bind(this);
        this.updateGoalStartNode = this.updateGoalStartNode.bind(this);
        
    }
    
    setPathNodes (nodes){
        const pathnodes = nodes;//[ {col: 6, id:128,isWat:'node',row:8},{col: 6, id:127,isWat:'node',row:8},{col: 7, id:126,isWat:'node',row:8},{col: 8, id:125,isWat:'node',row:8}]
       
       
        for(let i = 0; i < pathnodes.length;++i){
         const tempNode = this.state.grid[pathnodes[i].id];
        
         tempNode.isWat = "pathNode";
         
         this.setState({
            grid: [
               ...this.state.grid.slice(0,pathnodes[i].id),
               Object.assign({}, this.state.grid[pathnodes[i].id], tempNode),
               ...this.state.grid.slice(pathnodes[i].id+1)
            ]
          });
        }
        
        

        
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
        console.log(this.state.grid);
         let count = this.state.coloredNodeCount+1;
         this.setState({coloredNodeCount:count});
         const tempNode = this.state.grid[node.id];
         tempNode.isWat = nodeType;
         this.setState({
            grid: [
               ...this.state.grid.slice(0,node.id),
               Object.assign({}, this.state.grid[node.id], tempNode),
               ...this.state.grid.slice(node.id+1)
            ]
          });
        if(nodeType !== "wallNode"){
         
            const nodeLocation = node;
          
            this.setState({[nodeType]:node.id})
         
           
        }  
        if(nodeType == "wallNode")
        {
            
           this.setState(prevState => ({
               gridData: {
                   ...prevState.gridData,
                   [nodeType]:this.state.gridData.wallNode.concat([node])
               }
           }))
          
        }
      
    }
    decrementColoredNodeCount(nodeType,node){
        
        if(nodeType == 'goalNode' || 'startNode'){
            const nodeLocation = node;
            console.log(nodeType )
           
            const tempNode = this.state.grid[node.id];
         tempNode.isWat = 'node';
         this.setState({
            grid: [
               ...this.state.grid.slice(0,node.id),
               Object.assign({}, this.state.grid[node.id], tempNode),
               ...this.state.grid.slice(node.id+1)
            ]
          });
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
    handleWallChange = nodes => {
       // this.setState({startNode:nodes.wallNode[1]});
       
       this.setPathNodes(nodes); 
      this.setState(prevState => ({
        gridData: {
            ...prevState.gridData,
            ['wallNode']:[]
        }
    }))
      
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
                   
                    {/* {grid.map((row, rowIdx) => {
                        return <div className="grid-row" >
                            {row.map((node, nodeIdx) =>
                                <Node
                                    node = {node}
                                    decrementCount={this.decrementColoredNodeCount.bind(this)}
                                    incrementCount={this.incrementColoredNodeCount.bind(this)}
                                    nodeCount={this.state.coloredNodeCount}
                                    row={node.row}
                                    col={node.col}
                                    id = {node.id}
                                    goalNode={this.state.goalNode}
                                    startNode={this.state.startNode}
                                    pathList = {this.state.pathList}
                                    grid = {this.state.grid}
                                >

                                </Node>)}
                        </div>
                    })} */}

                    {grid.map((node,id) => {return <Node grid = {this.state.grid} goalNode={this.state.goalNode} decrementCount={this.decrementColoredNodeCount.bind(this)}
                                    incrementCount={this.incrementColoredNodeCount.bind(this)}node = {node}startNode={this.state.startNode} isWat = {node.isWat}></Node>})}

                </div>
                <div><PathfinderAlgorithms  grid = {this.state.grid} startNode = {this.state.startNode} goalNode = {this.state.goalNode}onWallChange = {this.handleWallChange} testData={testData1}></PathfinderAlgorithms></div>
            </div>

        )

    }
}
const getInitialGrid = () => {
    const nodeGrid = []
    let id = 0
    for (let row = 0; row < 20; row++) {
        //const currentRow = [];
        for (let col = 0; col < 20; ++col) {
           // currentRow.push(createNode(col, row, id));
           nodeGrid.push(createNode(col, row, id));
            id++
        }
        //nodeGrid.push(currentRow);
    }
    console.log(nodeGrid);
    
    return nodeGrid;

   
};
const createNode = (col,row, id) => {
    if(id == 5){
        return {
            row,
            col,
            isWat:'pathNode',
            id,
            
        }
    }
    return {
        row,
        col,
        isWat:'node',
        id,
        
    };
};