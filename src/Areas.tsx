import { NavLink } from 'react-router-dom';

/**
 * Basic info and links for each section of the game.
 * @returns
 */
function Areas() {
  return (
    <div className="my-6 grid grid-flow-col auto-cols-fr">
      <div>
        <h2>
          <NavLink className="block mr-10 w-3/4" to="/assets">Assets</NavLink>
        </h2>
      </div>
      <div>
        <h2>
          <NavLink className="block mr-10 w-3/4" to="/investments">Investments</NavLink>
        </h2>
      </div>
      <div>
        <h2>
          <NavLink className="block mr-10 w-3/4" to="/algorithms">Algorithms</NavLink>
        </h2>
      </div>
    </div>
  );
}

export default Areas;
