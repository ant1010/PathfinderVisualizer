import React, {Component} from 'react';
import './PathfindingVisualizer.css';


export default class PathfinderAlgorithms  extends Component{
    constructor(props){
        super(props);
        this.state = {
            
            Data: {startNode:{row:0,col:0},goalNode:{row:0,col:0}, wallNode:[0]},
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.algoOne = this.algoOne.bind(this);
    }
    componentDidMount(){
        
        this.setState({Data:this.props.gridData});
        
    }
    handleClick = () =>{
        if(this.props.gridData){
       this.setState({Data:this.props.gridData});
       
       

        }
       this.algoOne();
    }


    algoOne(){
     
    const goalNode = this.props.goalNode;
    const startNode = this.props.startNode;
    const Q = [];
    const dist = Array(400).fill(Number.MAX_VALUE);
    const S = Array(0).fill(0);
    Q.push([startNode,0]);
    
    
    
     while(Q.length != 0){
         let shortesStep = Q.shift();
         let current = shortesStep[0];
         let adj = this.adjacencyList(current);
         if(current == goalNode){
            console.log("done");
            break;
            
        }
        adj.forEach(node => {
            if(node[1] >= 0 && node[1] <400){
                let time = null;
                if(node[0] == "diagonal"){
                    let time = dist[current] + 1.4;
                }else{
                    let time = dist[current] + 1;
                }
                if(time < dist[node[1]]){
                    dist[node[1]] = time;
                    S[node[1]] = current;
                    
                    
                    Q.push([node[1],time]);
                }
            }
           
          
         });
         
     }
    const path = [goalNode];
         let lastStep = goalNode;
         while(lastStep !== startNode){
             path.unshift(S[lastStep]);
             lastStep = S[lastStep];
         }
         
         let pathNodes = this.generateProgressPath(path);
        
         this.props.onWallChange(pathNodes);


    }
    generateProgressPath(path){
        
        let pathNodes = [];
         while(path.length != 0){
            pathNodes.push( this.props.grid[path.shift()]);
         }
         return pathNodes;
    }
    adjacencyList(current){
        
        let adj = [];
        
        adj[0] = ["above",current-20];
        
        
        adj[1] = ["below",current+20];
        
        

        if(19%current != 19 || current != 19){
            adj[2] = ["right",current+1];
            adj[7] = ["diagonal",current-19];
            adj[4] = ["diagonal",current+21];
        }
        if(current%20 != 0 ){
            adj[3] = ["left",current-1];
            adj[6] = ["diagonal",current-21];
            adj[5] = ["diagonal",current+19];
        }
        let other = JSON.parse(JSON.stringify(adj));
        //Diagonal
       let progressPath = []; 
       adj.forEach(node => {
           if(node[1] >=0 && node[1] < 400){
               progressPath.push(node[1]);
           }
            });
        
       
        
       
 
      const p = this.generateProgressPath(progressPath);
       
      //this.props.onWallChange(p); 
       

        
                return adj;
    }
    
    render() {

       
      
       
        const test = 9;

        return (
           
            <div>
                <button class = "button" onClick={this.handleClick} > this a button 
                </button>
                
              
               
            </div>
        );

    }
}
