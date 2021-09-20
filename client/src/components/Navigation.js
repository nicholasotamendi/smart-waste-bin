import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Content from './Content';
import Chart from './Chart'
import Settings from './Settings'
import io from 'socket.io-client'
import axios from 'axios'

const ENDPOINT = 'http://localhost:5000/'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  let socket;
  const [bin, setBin] = useState([
    {level: 23, created: "12-03-2021"},
    {level: 3, created: "12-03-2021"},
    {level: 43, created: "12-03-2021"},
  ])

  //*********************GET ALL DATA****************/
  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //   }
  // };
  useEffect(() => {
    axios.get(`/ui`).then(resp => {
      // if(!resp.data.bin) return;
      if(resp.data.bin.length > 0){
        setBin(resp.data.bin)
      }
    }).catch(e => {})
  }, [])

  //**********************SOCKET IO*******************/
  useEffect(()=>{
    socket = io("/")
    // console.log("User has connected to socket")
    socket.on("readings", (readings, callback) => {
      // Set state to the current received reading
      // console.log(readings)
      setBin(prevBin => [...prevBin, readings])
      callback()
    })
  }, [ENDPOINT])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <div className={classes.root}>
    <div>
      {/* <AppBar position="static"> */}
      {/* <Paper square> */}
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Chart" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
        {/* </Paper> */}
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        <Content bin={bin}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chart bin={bin}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Settings ENDPOINT={ENDPOINT}/>
      </TabPanel>
    </div>
  );
}
