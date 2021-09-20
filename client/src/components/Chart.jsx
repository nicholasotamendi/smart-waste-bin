import React, { useEffect, useState } from 'react';
import { useTheme, useStyles, makeStyles } from '@material-ui/core/styles';
// import GetAppIcon from '@material-ui/icons/GetApp';
import { AreaChart, Area, Tooltip, CartesianGrid, LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from '../Title';
import { Paper, Container, Grid, Button } from '@material-ui/core';
// import {CSVLink} from 'react-csv'

const usePaperStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 420,
    spacing: 2,
  },
  paperSmall: {
    height: 80
  }
}));

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 40),
  createData('03:00', 70),
  createData('06:00', 20),
  createData('09:00', 30),
  createData('12:00', 22),
  createData('15:00', 50),
  createData('18:00', 55),
  createData('21:00', 10),
  createData('24:00', 59),
];

export default function Chart(props) {
  const theme = useTheme();
  const classes = usePaperStyles()

  const [sensorState, setSensorState] = useState([])

  useEffect(() => {
    let newMap = getSensorData(props.bin)
    setSensorState(newMap)
  }, [props])

  const getSensorData = (sensorAll) => {
    let newMap = sensorAll.map(sense => ({created: sense.created, level: sense.level}))
    return newMap
  }

  return (
    <React.Fragment>
      <div />
      {/* <Title>Chart</Title> */}
      <Container>
        <Grid sm={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <ResponsiveContainer>
            <AreaChart
              data={sensorState}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2451B7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2451B7" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              {/* <XAxis dataKey="created" stroke={theme.palette.text.secondary} axisLine={false} tickLine={false} tickFormatter={(str) => (parseInt(str) % 2 == 0) ? str : ""}/> */}
              {/* <XAxis dataKey="created" stroke={theme.palette.text.secondary} axisLine={false} tickLine={false} tickFormatter={(str) => str.substring(0,10)}/> */}
              <XAxis dataKey="created" stroke={theme.palette.text.secondary} axisLine={false} tickLine={false} tickFormatter={(str) => ""}/>
              <YAxis dataKey="level" stroke={theme.palette.text.secondary} axisLine={false} tickLine={false} tickCount={5}>
                <Label
                  angle={270}
                  position="left"
                  style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                >
                  Volume (Cm3)
                </Label>
              </YAxis>
              <Tooltip
                // (<span style={{color:theme.palette.primary.dark}}>str.substring(0,10)</span>) 
                labelFormatter={(value, name, props) => (<span style={{color:theme.palette.secondary.dark}}>{`${value.substring(0, 10)} ${value.substring(11, 19)}`}</span> )}
                formatter={(value, name, props) => ( [`${value} Cm3`, "Level"] )}
              />
              <CartesianGrid opacity={0.3} vertical={false}/>
              <Area type="monotone" dataKey="level" stroke="#2451B7" dot={false} fill="url(#color)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
        </Grid>
        {/* <Grid style={{marginTop: "2rem"}}>
        <CSVLink
            data={props.sensor}
            headers={
              [
                { label: "Time", key: "created" },
                { label: "Temperature (°C)", key: "temperature" },
                { label: "Pressure (Pa)", key: "pressure" },
                { label: "Humidity (%)", key: "humidity" },
                { label: "Light Intensity (cd)", key: "light" }
              ]
            }
            filename={`IUCE Weather ${String(new Date()).substring(4, 24)}.csv`}
            className="btn btn-primary"
            target="_blank"
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={downloadData}
            >
              Download CSV
            </Button>
          </CSVLink>
        </Grid> */}
      </Container>
    </React.Fragment>
  );
}