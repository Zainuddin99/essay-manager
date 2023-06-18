import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Components/Header';
import AddForm from './Components/AddForm';
import EssayPage from './Components/EssayPage';
import { useGlobalContext } from './context';
import { Alert, Container } from 'react-bootstrap';

function App() {
  const {errorState} = useGlobalContext()
  
  return (
    <Router>

      <Header/>

      {errorState.isError && <Container><Alert className='danger' variant="danger">{errorState.message}</Alert></Container> }
      
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>

        <Route path='/add-essay'>
          <AddForm/>
        </Route>

        <Route path='/essays/:id' children={<EssayPage/>}>
        </Route>

        <Route path='/edit-essay/:id' children={<AddForm/>}>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
