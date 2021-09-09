import { Link } from 'react-router-dom';

/**
 * Basic info and links for each section of the game.
 * @returns
 */
function Areas() {
  return (
    <div>
      <h2>
        <Link to="/assets">Assets</Link>
      </h2>
      <h2>
        <Link to="/investments">Investments</Link>
      </h2>
      <h2>
        <Link to="/algorithms">Algorithms</Link>
      </h2>
    </div>
  );
}

export default Areas;
