import React from 'react';
import ReactDOM from 'react-dom';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import App from './App';
import './index.css';




ReactDOM.render(
  <div>
   {/* <Header/>
   <TabContext value={this.state.tab}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList className = "tab"onChange={this.handleChange} aria-label="lab API tabs example">
      <Tab label="Item One" value="1" />
      <Tab label="Item Two" value="2" />
      <Tab label="Item Three" value="3" />
    </TabList>
  </Box>
  <TabPanel value="1"></TabPanel>
  <TabPanel value="2"> </TabPanel>
  <TabPanel value="3">Item Three</TabPanel>
</TabContext> */}
   <App/>
  
 </div>,

  document.getElementById('root')
);
