// import logo from './logo.svg';
// import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login'

let data = {
  user: {},
  isAuth: false
}
function App() {
    data = JSON.parse(localStorage.getItem("data"))
    // console.log(data)
  if(!data){
    return (
      <Login />
    );
  }else if(data.isAuth){
    return (
      // <div className="App">
      <Dashboard />
      // </div>
    )
  }
}

export default App;
