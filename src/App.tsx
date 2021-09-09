import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Stats from './Stats';
import Areas from './Areas';
import Assets from './Assets';
import Investments from './Investments';
import Algorithms from './Algorithms';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Stats />
      <Areas />

      <Switch>
        <Route exact path="/">
          <div>Stuff goes here</div>
        </Route>
        <Route path="/assets">
          <Assets />
        </Route>
        <Route path="/investments">
          <Investments />
        </Route>
        <Route path="/algorithms">
          <Algorithms />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
