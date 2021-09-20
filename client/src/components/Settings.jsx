import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Settings(props) {
  const classes = useStyles();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  useEffect(()=>{
      const {user} = JSON.parse(localStorage.getItem("data"))
      if(!user) return;
      // axios.get(`${props.ENDPOINT}users/load/${user._id}`).then(resp => {
      //   const {name, email, password} = resp.data.user
      //   setName(name)
      //   setEmail(email)
      //   setPassword1(password)
      //   setPassword2(password)
      // }).catch(e => {console.log(e)})
        setId(user._id)
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setPassword1(user.password)
        setPassword2(user.password)
  }, [])

  useEffect(() => {
    setInterval(() => {
      setSuccess(null)
    }, 3000)
  }, [success])

  useEffect(() => {
    setError(null)
  }, [email, password1, password2, name, phone])

  const updateData = () => {
      if(password1 !== password2){
          setError(["Passwords do not match"])
          setPassword1("")
          setPassword2("")
          return;
      }
      if(!email || !password1 || !phone || !name){
        setError("Fields cannot be empty")
        // console.log("Empty")
        return;
      }
      axios.post(`/users/update`, {id, name, email, phone, password: password1}).then(resp => {
          if(!resp.data.user){
            setError(resp.data.msg)
            return;
          }
          let {data} = resp
          data["isAuth"] = true
          localStorage.clear()
          localStorage.setItem("data", JSON.stringify(data))
          // setName(data.user.name)
          // setEmail(data.user.email)
          // setPassword1(data.user.password)
          // setPassword2(data.user.password)
          setSuccess([data.msg])
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Details
        </Typography>
        {error ? <Alert severity="error">{error}</Alert>
          :
          ""  
        }
        {success ? <Alert severity="success">{success}</Alert>
          :
          ""  
        }
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={updateData}
          >
            Update Data
          </Button>
        </form>
      </div>
    </Container>
  );
}