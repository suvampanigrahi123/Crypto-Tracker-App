import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header';
import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import {makeStyles} from '@material-ui/core'
const useStyles=makeStyles(()=>({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh'
  }
}))
function App() {
  const Classes=useStyles();
  return (
    <Router >
      <div className={Classes.App}>
        <Header />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/coins/:id' component={Coinpage} />
      </div>
    </Router>
  );
}

export default App;
