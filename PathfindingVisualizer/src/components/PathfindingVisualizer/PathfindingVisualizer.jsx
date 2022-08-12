import React,{Component,useRef} from 'react'
import Node from './Node/Node'
import PathfinderAlgorithms from './Algorithms/PathfinderAlgorithms'
import './PathfindingVisualizer.css';



const initialState = {
    grid: [],
    goalNode: null,
    startNode: null,
    wallNode:null,
    wallMouseEvent: false,
    
}


export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.nodeRefs = React.createRef([]);
        this.state = {
            grid: [],
            select: "false",
            goalNode: null ,
            startNode: null,
            wallNode:[],
            gridWidth:0,
            gridHeight:0,
            columns:0,
            rows:0,
            tab: 'one',
            
           
           
        };
       
        this.addSelectedNode = this.addSelectedNode.bind(this);
        this.removeSelectedNode = this.removeSelectedNode.bind(this);
        this.updateGoalStartNode = this.updateGoalStartNode.bind(this);
        this.updateprogressPath = this.updateprogressPath.bind(this);
        this.handleprogressAnimation = this.handleprogressAnimation.bind(this);
        
    }
    componentDidMount(){
        
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
        this.setState({rows:row});
        this.setState({columns:col});
        if(this.props.tabState == null){
        const grid = getInitialGrid(row,col);
        this.setState({grid})
        }else{
            console.log(this.props.tabState);
            this.setState({...this.props.tabState});
        }
        
       
    }

    clearState = (exception) =>{
        
        let i = this.state.grid.length-1;
        const grid_copy = this.state.grid.slice();
        while(i > 1){
           
            if(exception === "keep Maze" ){
                this.setState({ goalNode: null });
                this.setState({ startNode: null });
                if( grid_copy[i].isWat !== "wallNode"){
                    grid_copy[i].isWat = "node";
                    i--;
                }else{
                    i--;
                }
            
            }else{
               
                grid_copy[i].isWat = "node";
            i--;
           
            }
          
        }
       
        this.setState({ grid: grid_copy });
       
        if(exception !== "keep Maze" ){
       this.setState({...initialState});
       let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
       const grid = getInitialGrid(row,col);
        this.setState({grid})
        }
       
    }

    handleMouseDown = (node) =>
    {
       node.preventDefault;
      
       this.setState({wallMouseEvent:true});
    }
    handleMouseUp = (e) => 
    {
        if(this.state.wallMouseEvent === true){
            this.setState({wallMouseEvent:false});
            
        }
    }
    handleMouseEnter = (node) => 
    {
        
        if(this.state.wallMouseEvent == true && this.state.startNode !== null){
        
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
     
   
    async handleprogressAnimation(pathprogessList,pathNodes){
    
              await this.updateprogressPath(pathprogessList);
             //call to display final shortest path
             this.animationID = window.requestAnimationFrame(() =>  this.setPathNodes(pathNodes));
  
    }

    updateprogressPath(List) {
        //need ref components list
        // this.nodeRefs.current.map((component,i) => component.current.update());

        return new Promise((resolve) => {
            let c = 10;
            while (List.length > 0) {

                // this.nodeRefs.current[tmp.id].current.update();
                let tmp = List.shift();
                const grid_copy = this.state.grid.slice();
                const id = setInterval(() => {

                    if (tmp.isWat == 'node' ) {
                        this.nodeRefs.current[tmp.id].current.update();
                      
                        document.getElementById(tmp.id).className = 'node progressPathNode';
                       
                        
                        
                        grid_copy[tmp.id].isWat = "progressPathNode";
                        if(this.state.gridWidth < 350){
                           
                              this.setState({ grid: grid_copy });
                              this.setState({ grid: grid_copy });
                              this.setState({ grid: grid_copy });
                        }
                      
                    }

                    if (List.length < 1) {


                        clearInterval(id);
                    }

                }, 10);


            }

            setTimeout(resolve, 1000);
        });
        this.setState({ grid: grid_copy });
    }

    setPathNodes(nodes) {

        const pathnodes = nodes;
        if (nodes.length == 0) {
            window.cancelAnimationFrame(this.animationID);
            return;
        }

        const gridNode = nodes.shift().id;
        const tempNode = this.state.grid[gridNode];

        if ((tempNode.isWat !== "progressPathNode" && tempNode.isWat != "node") || tempNode.isWat == "pathNode") {
            console.log(tempNode.isWat);
            this.animationID = window.requestAnimationFrame(() => this.setPathNodes(nodes));
        } else if (pathnodes.length >= 1) {
            tempNode.isWat = "pathNode";
        }

        this.setState({
            grid: [
                ...this.state.grid.slice(0, gridNode),
                Object.assign({}, this.state.grid[gridNode], tempNode),
                ...this.state.grid.slice(gridNode + 1)
            ]
        });

        this.animationID = window.requestAnimationFrame(() => this.setPathNodes(nodes));

    }
    

    resize() {
       
        let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
        this.setState({rows:row});
        this.setState({columns:col});
        const grid = getInitialGrid(row,col);
        this.setState({grid})
         this.clearState(false);
    }
    setDimensions(){
       
        let screenW = window.innerWidth;
        let screenH = window.innerHeight;
        console.log("w: " + screenW + '\n' + "H: " + screenH);
        if(screenW > 1400 && screenH > 947){
            this.setState({gridWidth:1220});
            this.setState({gridHeight:820});
            this.clearState;
            return [41,61];
        }
        if(screenW > 1080 && screenH > 689){
            this.setState({gridWidth:1020});
            this.setState({gridHeight:580});
            return [29,51];
        }
        if(screenW > 800 && screenH > 600){
            this.setState({gridWidth:820});
            this.setState({gridHeight:500});
            return [25,41];
        }
        if(screenW > 565 && screenH > 850){
            this.setState({gridWidth:500});
            this.setState({gridHeight:820});
            return [41,25];
        }
         if(screenW < 565 && screenH > 560){
             console.log("second smallest");
            this.setState({gridWidth:400});
            this.setState({gridHeight:800});
            return [23,13];
        }
        else{
            console.log("smallest");
            this.setState({gridWidth:300});
            this.setState({gridHeight:380});
            return [19,15];
        }
        // if(screenW < 565 && screenH > 560){
        //     this.setState({gridWidth:400});
        //     this.setState({gridHeight:800});
        //     return [23,13];
        // }
        // else{
        //     this.setState({gridWidth:300});
        //     this.setState({gridHeight:380});
        //     return [19,15];
        // }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
        this.props.componentUnmountCallback(this.state,this.props.tabId);
    }
   
    
    addSelectedNode(nodeType,node){
        
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
    }
    removeSelectedNode(nodeType,node){
       
        if(nodeType == 'goalNode' || 'startNode'){

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
        
    }
    updateGoalStartNode(nodeType, newStatus){
        this.setState({[nodeType]:newStatus});
       
        
    }
    handleWallChange = nodes => {
    
       this.setPathNodes(nodes); 
     
    }


    render() {
        const { grid } = this.state;
       
        const myRefs = this.nodeRefs;
        this.nodeRefs.current = grid.map((element, i) => myRefs.current[i] ?? React.createRef());
       


        return (
            <div className = 'box' id="tag">
           
       
            
             <div className="grid" style = {{width:this.state.gridWidth,height:this.state.gridHeight}} onMouseDown = {this.handleMouseDown} onMouseUp = {this.handleMouseUp} >

                    {grid.map((node,id) => { return <Node 
                    
                    ref = {myRefs.current[id]}
                    handleMouseDown = {this.handleMouseDown}
                    handleMouseEnter = {this.handleMouseEnter}
                    handleMouseUp = {this.handleMouseUp}
                    grid = {this.state.grid} 
                    goalNode={this.state.goalNode} 
                    decrementCount={this.removeSelectedNode.bind(this)}
                    incrementCount={this.addSelectedNode.bind(this)}
                    node = {node}
                    startNode={this.state.startNode} 
                    isWat = {node.isWat}> 
                    </Node>})}
                    
                <PathfinderAlgorithms  
                grid = {this.state.grid} 
                startNode = {this.state.startNode} 
                goalNode = {this.state.goalNode}
                clearGrid = {this.clearState}
                addNode = {this.addSelectedNode}
                removeNode = {this.removeSelectedNode}
                onWallChange = {this.setPathNodes}
                gridHeight = {this.state.gridHeight}
                gridWidth = {this.state.gridWidth}
                animateProgress = {this.handleprogressAnimation}
                columns = {this.state.columns}
                rows = {this.state.rows}
                >
                }
                </PathfinderAlgorithms>
               
                </div> 
              
            </div>

        )

    }
}
const getInitialGrid = (srow,scol) => {
    const nodeGrid = []
    let id = 0
    
   
    for (let row = 0; row < srow; row++) {
        for (let col = 0; col < scol; ++col) {  
           nodeGrid.push(createNode(col, row, id));
            id++
        }
       
    }
   
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