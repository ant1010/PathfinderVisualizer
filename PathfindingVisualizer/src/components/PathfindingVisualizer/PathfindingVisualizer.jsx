import React,{Component,useRef} from 'react'
import Node from './Node/Node'
import PathfinderAlgorithms from './Algorithms/PathfinderAlgorithms'
import './PathfindingVisualizer.css';




const initialState = {
    grid: [],
    coloredNodeCount: 0,
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
            goalNode: null,
            startNode: null,
            wallNode:null,
            pathList :[ {}],
            gridWidth: 800,
            gridHeight:460,
            
           
           
        };
       
        this.addSelectedNode = this.addSelectedNode.bind(this);
        this.removeSelectedNode = this.removeSelectedNode.bind(this);
        this.updateGoalStartNode = this.updateGoalStartNode.bind(this);
        this.updateprogressPath = this.updateprogressPath.bind(this);
        this.handleprogressAnimation = this.handleprogressAnimation.bind(this);
        
    }

    clearState = () =>{
        let i = this.state.grid.length-1;
        while(i > 0){
            document.getElementById(i).className = 'node node';
            i--;
        }
       this.setState({...initialState});
       let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
       const grid = getInitialGrid(row,col);
        this.setState({grid})

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
        
        if(this.state.wallMouseEvent == true){
        
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
    
  await this.updateprogressPath(pathprogessList,pathNodes);
  this.animationID = window.requestAnimationFrame(() =>  this.setPathNodes(pathNodes));
  
    }

    updateprogressPath(List,pathNodes){
        //need ref components list
       // this.nodeRefs.current.map((component,i) => component.current.update());
       return new Promise((resolve) => {  let c = 10 ;
        while(List.length > 0 ){
            let tmp = List.shift();
           // this.nodeRefs.current[tmp.id].current.update();
           
          const id =  setInterval(() =>{  
               if(tmp.isWat != 'pathNode' && tmp.isWat != 'startNode' ){
             this.nodeRefs.current[tmp.id].current.update()
             
             document.getElementById(tmp.id).className = 'node progressPathNode';
             if(List.length < 1){
                 
                 clearInterval(id);
             }
               }
         
            },1000);
           
           }
 
           //}
            // this.nodeRefs.current[tmp.id].current.update();
           
             
           //this.setPathNodes(tmp);
          //
           //return;
       
      
        setTimeout(resolve, 1000);
        });
       
    }
    componentDidMount(){
        
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
        const grid = getInitialGrid(row,col);
        this.setState({grid})
        
    }

    resize() {
        this.clearState();
        let dim = this.setDimensions();
        let row = dim[0];
        let col = dim[1];
        const grid = getInitialGrid(row,col);
        this.setState({grid})
        
    }
    setDimensions(){
       
        let screenW = window.innerWidth;
        let screenH = window.innerHeight;
        if(screenW > 1200 && screenH > 947){
            this.setState({gridWidth:1200});
            this.setState({gridHeight:800});
            this.clearState;
            return [40,60];
        }
        if(screenW > 1000 && screenH > 689){
            this.setState({gridWidth:1000});
            this.setState({gridHeight:560});
            return [28,50];
        }
        if(screenW > 800 && screenH > 600){
            this.setState({gridWidth:800});
            this.setState({gridHeight:460});
            return [23,40];
        }
        if(screenW > 420 && screenH > 560){
            this.setState({gridWidth:400});
            this.setState({gridHeight:500});
            return [25,20];
        }
        else{
            this.setState({gridWidth:200});
            this.setState({gridHeight:300});
            return [15,10];
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }
    
    addSelectedNode(nodeType,node){
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
    }
    removeSelectedNode(nodeType,node){
        
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
        
    }
    updateGoalStartNode(nodeType, newStatus){
        this.setState({[nodeType]:newStatus});
       
        
    }
    handleWallChange = nodes => {
    
       this.setPathNodes(nodes); 
     
    }
    setPathNodes (nodes){
       
        const pathnodes = nodes;
        if(nodes.length == 0){   
            window.cancelAnimationFrame(this.animationID);
            return;
            }   
        
       // for(let i = 0; i < pathnodes.length;++i){
           
         //const tempNode = this.state.grid[pathnodes[i].id];
       
         const gridNode = nodes.shift().id;
         const tempNode = this.state.grid[gridNode];
         
         if(tempNode.isWat != "node" || tempNode.isWat == "pathNode"){
            console.log(tempNode);
            this.animationID = window.requestAnimationFrame(() => this.setPathNodes(nodes));
         }else if(pathnodes.length >= 1){
            tempNode.isWat = "pathNode";
        }//else{
        //     tempNode.isWat = "progressPathNode";
        // }
        
    //     this.setState({
    //     grid: [
    //        ...this.state.grid.slice(0,pathnodes[i].id),
    //        Object.assign({}, this.state.grid[pathnodes[i].id], tempNode),
    //        ...this.state.grid.slice(pathnodes[i].id+1)
    //     ]
    //   });

    this.setState({
        grid: [
           ...this.state.grid.slice(0,gridNode),
           Object.assign({}, this.state.grid[gridNode], tempNode),
           ...this.state.grid.slice(gridNode+1)
        ]
      });
 
      this.animationID = window.requestAnimationFrame(() => this.setPathNodes(nodes));
      
       
       // } 
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
                onWallChange = {this.handleWallChange} 
                gridHeight = {this.state.gridHeight}
                gridWidth = {this.state.gridWidth}
                animateProgress = {this.handleprogressAnimation}
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