import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Delete from '@material-ui/icons/Delete';
// import { green } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
      height: 'auto',
      width: 'auto',
      padding: theme.spacing(1),
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex" style={{width: "11rem", height: "11rem"}}>
        <CircularProgress variant="determinate" {...props} style={{width: "11rem", height: "11rem"}}/>
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle2" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


function Content(props){
    const classes = useStyles();
    const [progress, setProgress] = useState(100);
    //*****************Delete This Later****************
    useEffect(() => {
        // const timer = setInterval(() => {
        // setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        // }, 1000);
        // return () => {
        // clearInterval(timer);
        // };
        setProgress(parseInt(props.bin[props.bin.length - 1].level))
    }, [props]);

    return(
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Paper className={classes.paper}>
            <Grid item>
                {
                    progress > 80 ? 
                    // <Paper className={classes.paper} style={{backgroundColor: "red"}} />
                    <Delete style={{ color: 'red', fontSize: '2rem' }}/>
                            : 
                        (progress > 50 ?
                            // <Paper className={classes.paper} style={{backgroundColor: "yellow"}} />
                            <Delete style={{ color: 'yellow', fontSize: '2rem' }}/>
                                :
                                // <Paper className={classes.paper} style={{backgroundColor: "green"}} />
                                <Delete style={{ color: 'green', fontSize: '2rem' }}/>
                        )
                }
                
            </Grid>

            <Grid item>
              <Paper className={classes.paper}>
                <CircularProgressWithLabel value={progress} />
              </Paper>
            </Grid>

            <Grid item>
              {/* <Paper className={classes.paper}> */}
              <Typography variant="subtitle2" component="div" color="textSecondary">
                <strong>FOUL ODOUR: </strong>{props.bin[props.bin.length - 1].smell === "1" ? "   Yes": "   No"}
              </Typography>
              {/* </Paper> */}
            </Grid>

            {/* <Grid item>
              <Paper className={classes.paper}>
                <Delete style={{ color: 'yellow', fontSize: '12rem' }}/>
              </Paper>
            </Grid> */}

          </Paper>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
            </Grid>
          </Grid>
        </Paper>
      </Grid> */}
    </Grid>
    )
}

export default Content