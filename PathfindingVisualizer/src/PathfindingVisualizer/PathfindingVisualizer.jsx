import React,{Component} from 'react'
import Node from './Node'
import PathfinderAlgorithms from './PathfinderAlgorithms'
import './PathfindingVisualizer.css';


const initialState = {
    grid: [],
    coloredNodeCount: 0,
    goalNode: null,
    startNode: null,
    wallNode:null,
    wallMouseEvent: false,
    pathList :[ {}],
    gridData: {goalNode:{row:0,col:0},startNode:{row:0,col:0},wallNode:[{}],}
}


export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            coloredNodeCount: 0,
            select: "false",
            goalNode: null,
            startNode: null,
            wallNode:null,
            pathList :[ {}],
            gridData: {goalNode:{row:0,col:0},startNode:{row:0,col:0},wallNode:[{}],}
        };
       
        this.incrementColoredNodeCount = this.incrementColoredNodeCount.bind(this);
        this.decrementColoredNodeCount = this.decrementColoredNodeCount.bind(this);
        this.updateGoalStartNode = this.updateGoalStartNode.bind(this);
        
    }
    clearState = () =>{
       this.setState({...initialState});
       const grid = getInitialGrid();
        this.setState({grid})
    }
    handleMouseDown = (node) =>
    {
        
       //node.preventDefault;
       console.log("pfv_mousedown");
      this.setState({wallMouseEvent:true});
        

    }
    handleMouseUp = (e) => 
    {
        
        if(this.state.wallMouseEvent === true){
            this.setState({wallMouseEvent:false});
            console.log("pfv_mousedoup");
        }
        
        

    }
    handleMouseEnter = (node) => 
    {
        
        if(this.state.wallMouseEvent == true){
             console.log("pfv_moseenter");
             console.log(node);
             const tempNode = node;
             tempNode.isWat = "wallNode";
             this.setState({
                grid: [
                   ...this.state.grid.slice(0,node.id),
                   Object.assign({}, this.state.grid[node.id], tempNode),
                   ...this.state.grid.slice(node.id+1)
                ]
              });
        }
    }
        
            
        
       
        

    
   
    setPathNodes (nodes){
        const pathnodes = nodes;
       
        for(let i = 0; i < pathnodes.length;++i){
         const tempNode = this.state.grid[pathnodes[i].id];
         if(tempNode.isWat != "node"){
             continue;
         }
        if(pathnodes.length > 1){
            tempNode.isWat = "pathNode";
        }else{
            tempNode.isWat = "progressPathNode";
        }
         
         
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
             
                <div className="grid"  onMouseDown = {this.handleMouseDown} onMouseUp = {this.handleMouseUp} >
                   
                    {/* {grid.map((row, rowIdx) => {
                        return <div className="grid-row" >
                       
                         onMouseDown={ this.handleMouseDown()} onMouseUp={this.handleMouseUp()} onMouseEnter={  this.handleMouseEnter()}
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



                    {grid.map((node,id) => { return <Node 
                    handleMouseDown = {this.handleMouseDown}
                    handleMouseEnter = {this.handleMouseEnter}
                    handleMouseUp = {this.handleMouseUp}
                    grid = {this.state.grid} 
                    goalNode={this.state.goalNode} 
                    decrementCount={this.decrementColoredNodeCount.bind(this)}
                    incrementCount={this.incrementColoredNodeCount.bind(this)}
                    node = {node}startNode={this.state.startNode} 
                    isWat = {node.isWat}>
                    </Node>})}

                </div>
                <div><PathfinderAlgorithms  grid = {this.state.grid} startNode = {this.state.startNode} goalNode = {this.state.goalNode}clearGrid = {this.clearState}onWallChange = {this.handleWallChange} ></PathfinderAlgorithms></div>
            </div>

        )

    }
}
const getInitialGrid = () => {
    const nodeGrid = []
    let id = 0
    for (let row = 0; row < 30; row++) {
        //const currentRow = [];
        for (let col = 0; col < 30; ++col) {
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
   
    
    return {
        row,
        col,
        isWat:'node',
        id,
        
    };
};