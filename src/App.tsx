import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Simulation from './Simulation';

function App() {
  return (
    <Router>
      <Header />
      <div className="mx-auto max-w-screen-lg px-6 mb-10">
        <Simulation />
      </div>
    </Router>
  );
}

export default App;
