import React, {Component} from 'react';
import './PathfinderAlgorithms.css'
import ReactDOM from 'react-dom';

export default class PathfinderAlgorithms  extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            Data: {startNode:{row:0,col:0},goalNode:{row:0,col:0}, wallNode:[0]},
            seen:false,
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.algoOne = this.algoOne.bind(this);
    }
    componentDidMount(){
        
        this.setState({Data:this.props.gridData});
        
    }
    handleClick = value => () =>{
        if(value == 'reset'){
            this.props.clearGrid();
            return;

        }else if(this.props.gridData){
       this.setState({Data:this.props.gridData});
       
       

        }
       this.algoOne();
    }


    algoOne(){
     
    const goalNode = this.props.goalNode;
    const startNode = this.props.startNode;
    const Q = [];
    const nodeCount = (this.props.gridWidth/20)*(this.props.gridHeight/20);
    console.log(this.props.gridWidth);
    const dist = Array(nodeCount).fill(Number.MAX_VALUE);
    const S = Array(0).fill(0);
    let foundPath = "false";
    Q.push([startNode,0]);
    
    let pathprogressList = [];
    
     while(Q.length != 0){
         let shortesStep = Q.shift();
         let current = shortesStep[0];
         let adj = this.generateAdjacencyList(current);
         if(current == goalNode){
           foundPath = true;
            break;
            
        }
       
        adj.forEach(node => {
           
            if(node[1] >= 0 && node[1] < nodeCount){
                if(this.props.grid[node[1]].isWat == 'wallNode'){
                    dist[node[1]] = null;
                    return;
                }
                let time = null;
                // if(node[0] == "diagonal"){
                //     let time = dist[current] + 1000;
                    
                // }else{
                    if(node[0] != "diagonal"){
                    let time = dist[current] + 1;
                }
                if(time < dist[node[1]]){
                    dist[node[1]] = time;
                    S[node[1]] = current;
                    Q.push([node[1],time]); 
                    const tmp = [current];
                   
                     let setPath = this.generateProgressPath(tmp);
                     if(setPath[0] != pathprogressList[pathprogressList.length-1]){
                        // 
                    //setTimeout(() => {document.getElementById(setPath[0].id).className = 'node progressPathNode';},6000)
                     pathprogressList.push(setPath[0]);
                    // setInterval(() => { 
                    //          this.props.onWallChange(setPath);
                    //            },10000);
                    
                      }
                 } 
            }    
         });
      
         
     }
     if(foundPath == "false"){
        this.handleToggle();
         return;
     }
        const path = [goalNode];
         let lastStep = goalNode;
         while(lastStep !== startNode){
             path.unshift(S[lastStep]);
             lastStep = S[lastStep];
         }
         
        let pathNodes = this.generateProgressPath(path);
        //this.props.onWallChange(pathNodes);
        this.props.animateProgress(pathprogressList,pathNodes);
        


    }
    generateProgressPath(path){
        
        let pathNodes = [];
         while(path.length != 0){
            pathNodes.push( this.props.grid[path.shift()]);
         }
         return pathNodes;
    }
    generateAdjacencyList(current){
        let row = this.props.gridHeight/20;
        let col = this.props.gridWidth/20;
        const nodeCount = row*col;
        let adj = [];
        
        adj[0] = ["above",current-col];
        
        
        adj[1] = ["below",current+col];
        
        
        //for nodes on the left edges of grid
        if((col-1)%current != (col-1) || current !=(col-1)){
            adj[2] = ["right",current+1];
           // adj[7] = ["diagonal",current-(col-1)];
           // adj[4] = ["diagonal",current+(col+1)];
        }
        //for nodes on the right edges of the grid
        if(current%col != 0 ){
            adj[3] = ["left",current-1];
            //adj[6] = ["diagonal",current-(col+1)];
            //adj[5] = ["diagonal",current+(col-1)];
        }



        let other = JSON.parse(JSON.stringify(adj));
        
    //    let progressPath = []; 
    //    adj.forEach(node => {
    //        if(node[1] >=0 && node[1] < nodeCount){
    //            progressPath.push(node[1]);
    //        }
    //         });
        
    //   const p = this.generateProgressPath(progressPath);
       
    //   this.props.onWallChange(p); 
       

        
                return adj;
    }
   handleToggle =()=> {
        this.setState({
         seen: !this.state.seen
        });
       };
    
    render() {


        return (
           
            <div>



              


                <button className = "button" onClick={this.handleClick('Dijkstra')} > Dijkstra
                </button>
                <button className = "button" onClick={this.handleClick('reset')} > Clear
                </button>
                {this.state.seen ? <div className="modal">
        <div className="modal_content">
        
          <span className="close" onClick={this.handleToggle}>

            &times;
            
          </span>
           <h1>Goal node unreachable:( </h1>
          </div>
         
          </div>  : null}
                  
               
 
               
            </div>
            
        );

    }
}
