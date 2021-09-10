import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Stats from './Stats';
import Areas from './Areas';
import Assets from './Assets';
import Investments from './Investments';
import Algorithms from './Algorithms';

function App() {
  return (
    <Router>
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <Stats />
        <Areas />

        <Switch>
          <Route exact path="/">
            <div>Stuff goes here</div>
          </Route>
          <Route path="/assets"  component={Assets} />
          <Route path="/investments"  component={Investments} />
          <Route path="/algorithms"  component={Algorithms} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
