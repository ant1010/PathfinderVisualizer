import React, { Component } from 'react';
import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import { Box, ThemeProvider, createTheme } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Header from './components/layout/Header';
export default class App extends Component {
    constructor(props){
        super(props);
        this.nodeRefs = React.createRef([]);
        this.state = {
          
            tab: "0",
            tabList: [] ,
            tabState:[],
           
        };
          this.childComponentWillUnmount = this.childComponentWillUnmount.bind(this);
    }
    componentDidMount(){
        
        this.handleNewTab();
    }
    childComponentWillUnmount(data, tabId) {

        let tabState_copy = this.state.tabState.slice();
        if (tabId < this.state.tabState.length) {
            tabState_copy[tabId] = data;
        } else {
            tabState_copy.push(data);

        }
        this.setState({ tabState: tabState_copy });
    }
    handleChange = (event,value) => {
        this.setState({tab:value});
      };
      handleNewTab = () =>{
         
        
          if(this.state.tabList.length >= 8){
              return;
          }
          let new_tab = <Tab label={`Item ${this.state.tabList.length+1}`} value={`${this.state.tabList.length+1}`} />
          let tabs_copy = this.state.tabList.slice();
          tabs_copy.push(new_tab);
          this.setState({ tabList: tabs_copy});
          
          let tabState_copy = this.state.tabState.slice();
          tabState_copy.push(null);
          this.setState({ tabState: tabState_copy});
          let tabNum = (tabState_copy.length - 1) + '';
          this.setState({tab:tabNum});
          
          
      }
    handleDeleteTab = () => {

        if (this.state.tabList.length != 1) {
            let tabList_copy = [...this.state.tabList];
            const num = Number(this.state.tab);
            tabList_copy.splice(num, 1);
            const tabState_copy = [...this.state.tabState];
            tabState_copy.splice(num, 1);
            this.setState({ tabState: tabState_copy });
            this.setState({ tabList: tabList_copy });
            this.setState({ tab: "0" });


        } else {
            this.setState({ tab: "0" });
            return;
        }

    }

    render() {
        let tab = this.state.tab;
        //let tabs = Array(4);

        let numTabs = this.state.tabList.length;
      
      

        return (
            
            <div className="App">
                       
                <Header />
                <div className = "button-container">
                       <button className="tab-buttons" onClick={this.handleNewTab}>New Tab +</button>
                        <button className="tab-buttons" onClick={this.handleDeleteTab}>Delete Tab -</button>
                </div>
                
                <TabContext value={tab}>

                    <Box className="tablist" color="white">
                        <TabList selected sx={{
                            '& .MuiTab-root': {
                                borderRadius: '1px', color: "white", fontSize: '12px',
                            },
                            '& .MuiTab-root:hover': {
                                borderRadius: '1px', color: "rgba(38, 230, 255, 0.911)",
                            },
                            borderBottom: 3,
                            color: 'white',
                            textSize: "5px",
                            borderColor: 'divider'
                        }}
                            onChange={this.handleChange} aria-label="lab API tabs example" centered>


                            {numTabs > 1 ? this.state.tabList.map((id, i) => { console.table(i); return <Tab key={i} className="tab" label={`Grid ${i}`} value={`${i}`} /> }) : <Tab key={0} className="tab-hidden" label={`Grid ${0}`} value={`${0}`} />}



                        </TabList>


                    </Box>

                    <div className="tab-container">

                    </div>
                    {this.state.tabList.map((id, i) => { return <TabPanel value={`${i}`}><PathfindingVisualizer tabId={i} tabState={this.state.tabState[i]} componentUnmountCallback={this.childComponentWillUnmount}></PathfindingVisualizer></TabPanel> })}


                </TabContext>


            </div>

        );

    }
}
