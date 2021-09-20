import React, { useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from "@material-ui/core/Switch";
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './Navigation'
import Button from '@material-ui/core/Button'

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

export default function Dashboard() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    }
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <div className={classes.root}>
    <CssBaseline />
      <AppBar position="static" style={{ background: '#2E3B55', marginBottom: '2rem' }}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Smart Bin
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button 
            variant="outlined"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
          <Switch checked={darkState} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {/* <Content /> */}
        <Navigation />
      {/* <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
            <Grid item>
                {
                    progress > 80 ? 
                    <Paper className={classes.paper} style={{backgroundColor: "red"}} />
                            : 
                        (progress > 50 ?
                            <Paper className={classes.paper} style={{backgroundColor: "yellow"}} />
                                :
                                <Paper className={classes.paper} style={{backgroundColor: "green"}} />)
                }
                
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <Delete style={{ color: 'yellow', fontSize: '15rem' }}/>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                <CircularProgressWithLabel value={progress} />
              </Paper>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid> */}
      </Container>
    </div>
    </ThemeProvider>
  );
}
