
import './App.css';
import Authenticate from './components/authenticate/Authenticate';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Authenticate} />
      </Switch>
    </Router>
  );
}

export default App;
