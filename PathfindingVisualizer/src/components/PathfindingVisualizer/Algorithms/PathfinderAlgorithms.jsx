import React, {Component} from 'react';
import './PathfinderAlgorithms.css'
import ReactDOM from 'react-dom';
import Footer from '../../layout/Footer';
export default class PathfinderAlgorithms extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Data: { startNode: { row: 0, col: 0 }, goalNode: { row: 0, col: 0 }, wallNode: [0] },
            seen: false,
            mazePressed: "button",
            info:false,

        }
        this.handleClick = this.handleClick.bind(this);
        this.algoOne = this.algoOne.bind(this);
        this.handlePopup = this.handlePopup.bind(this);

    }
    componentDidMount(){
        
        this.setState({Data:this.props.gridData});
        
    }
    handleClick = value => () => {
        if(value === "info"){
           this.state.info? this.setState({info:false}):this.setState({info:true});
            return;
        }
        if (value == 'reset') {
            if(this.state.mazePressed !== "button_maze"){
                this.props.clearGrid();
            return;
            }else{
                this.props.clearGrid("keep Maze");
            return;
            }
            

        } else if (this.props.gridData) {
            this.setState({ Data: this.props.gridData });

        }
        this.algoOne();
    }
    generateKruskalMaze = () => {
        if(this.state.mazePressed === "button"){
        this.props.clearGrid();
        this.setState({mazePressed:"button_maze"})
        }else{
            
            this.setState({mazePressed:"button"})
            this.props.clearGrid();
            return;
            
    }
        //Schwartzian transform shuffles edges randomly
        const unshuffledEdges = this.findvalidEdges();
        //console.table(unshuffledEdges);
        let edges = unshuffledEdges
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
      
        var arr = [];
        const nodeCount = (this.props.gridWidth / 20) * (this.props.gridHeight / 20);
        const rows = (this.props.gridHeight / 20);
        const cols = (this.props.gridWidth / 20);
        let parent = Array(nodeCount).fill(null);;
       // Initializes the data structure such that all nodes have themeselves as parents.
        this.props.grid.forEach(e => (parent[e.id]=e.id));
        
       let wallDown = null;
       
         while(edges.length > 0 ){
             let node_one = null;
             let node_two = null;
            
              let edge = edges.shift();
              if(edge[1] == 'V'){
                node_one = edge[0] - 1;
                node_two = edge[0] + 1;
              }else if(edge[1] == 'H'){
                node_one = edge[0] - cols;
                node_two = edge[0] + cols;
              }else if(edge[0] == 'D'){
                
              }
            
              if(node_one !== null && node_two !== null ){
                //console.table(parent);
              
              wallDown = this.kruskalUnion(parent,node_one,node_two);
              if(wallDown){
                //document.getElementById(edge[0]).className = 'node node';
               this.props.addNode("node",this.props.grid[edge[0]]);
              }
              }
             
         }  
       
    }
    kruskalUnion = (parent,a,b) => {
        let root_a = this.kruskalFind(parent,a);
        let root_b = this.kruskalFind(parent,b);

        if(root_a == root_b){ return false;}

        if(root_a < root_b){
          if(parent[b] != b ){ this.kruskalUnion(parent,parent[b],a)}
          parent[b] = parent[a];
        }else{
            if(parent[a] != a){this.kruskalUnion(parent,parent[a],b)}
            parent[a] = parent[b];
        }
       
        return true;
        
    }  
    kruskalFind = (parent,a) => {
       
        while(parent[a] != a){
            
            a = parent[a];
        }
        return a;
    }
    findvalidEdges = () => {
        const col = (this.props.gridWidth / 20);
        const row = (this.props.gridHeight / 20);
        let i = 0;
        let edges = [];
        let nodes = [];
        for (let j = 0; j < row; ++j) {
            for (let k = 0; k < col; ++k) {
                if (k % 2 == 0 || j % 2 == 0 ) {
                    //handler to update state grid
                    //document.getElementById(i).className = 'node wallNode';
                    this.props.addNode("wallNode",this.props.grid[i]);
                }
                //Vertically connecting edges
                 if (k % 2 == 0 && j % 2 == 1 && k != 0 && j != 0 && k != col - 1 && j != row - 1) {
                    //handler to update state grid
                   // document.getElementById(i).className = 'node goalNode';
                    edges.push([i, "V"]);
                }
                if (k % 2 == 0 && j % 2 == 0 && k != 0 && j != 0 && k != col - 1 && j != row - 1) {
                    //handler to update state grid
                   // document.getElementById(i).className = 'node startNode';
                    edges.push([i, "D"]);
                }
                //Horizontally connecting edges
                  if ((k % 2 == 1 && j % 2 == 0) && k != 0 && j != 0 && k != col - 1 && j != row - 1) {
                    //handler to update state grid
                    //document.getElementById(i).className = 'node startNode';
                    edges.push([i, "H"]);

                }
                //open nodes
                if(i%2 == 0 && j%2 == 1 ){
                    nodes.push(i);
                }
                i++;
            }

        }
        return edges;

    }

    algoOne() {
        const goalNode = this.props.goalNode;
        const startNode = this.props.startNode;
        const Q = [];
        const nodeCount = (this.props.gridWidth / 20) * (this.props.gridHeight / 20);
        const dist = Array(nodeCount).fill(Infinity);
        dist[startNode] = 0;
        const S = Array(0).fill(0);
        let foundPath = false;
        Q.push([startNode, 0]);
       
        let pathprogressList = [];
        console.table(dist);
        while (Q.length != 0) {
            let shortesStep = Q.shift();
            let current = shortesStep[0];
            let adj = this.generateAdjacencyList(current);
            if (current == goalNode) {
                foundPath = true;
                break;

            }

            adj.forEach(node => {
                
                if (node[1] >= 0 && node[1] < nodeCount) {
                    let weight = 1;
                if(this.props.grid[node[1]].isWat == "weightNode"){
                    weight = 7;
                }
                    if (this.props.grid[node[1]].isWat == 'wallNode') {
                        dist[node[1]] = null;
                        return;
                    }
                     let time = dist[current] + weight;
                    // if(this.props.grid[node[1]].isWat == 'weightNode'){
                       
                    //     let time = dist[node[1]] + 100;
                        
                    // }else if (node[0] == "diagonal") {
                    //      console.log("what");
                    //     time = dist[node[1]] + 1;
                    // }else{
                       
                       
                       
                    // }
                    
                    console.log(Q.length + " " + time + "; " +dist[node[1]] )
                    if (time < dist[node[1]] ) {
                        dist[node[1]] = time;
                        S[node[1]] = current;
                        Q.push([node[1], time]);
                        const tmp = [current];

                        let setPath = this.generateProgressPath(tmp);
                        if (setPath[0] != pathprogressList[pathprogressList.length - 1]) {
                            
                            pathprogressList.push(setPath[0]);
                    

                        }
                    }
                }
            });


        }
      
        if (foundPath == false) {
              console.log("waht");
            this.handlePopup();
            return;
        }
        const path = [goalNode];
        let lastStep = goalNode;
        while (lastStep !== startNode) {
            path.unshift(S[lastStep]);
            lastStep = S[lastStep];
        }

        let pathNodes = this.generateProgressPath(path);
        //this.props.onWallChange(pathNodes);
        this.props.animateProgress(pathprogressList, pathNodes);



    }
    generateProgressPath(path){
        
        let pathNodes = [];
         while(path.length != 0){
            pathNodes.push( this.props.grid[path.shift()]);
         }
         return pathNodes;
    }
    generateAdjacencyList(current){
       
        let row = this.props.gridHeight/20 ;
        let col = this.props.gridWidth/20 ;
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
       
        
                return adj;
    }
   handlePopup = () => {
      
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
                <button className ={`button ${this.state.mazePressed}`} onClick={this.generateKruskalMaze} > Maze
                </button>
                <button className = "button button_info" onClick = {this.handleClick('info')} > ?
                </button>
                {this.state.seen ? <div className="modal1">
        <div className="modal_content1">
        
          <span className="close" onClick={this.handlePopup}>

            &times;
            
          </span>
           <h1>There are no paths to goal node. 😰 </h1>
          </div>
         
          </div>  : null}
                  
             {this.state.info ? <Footer ></Footer>:null}  
 
               
            </div>
            
        );

    }
}
