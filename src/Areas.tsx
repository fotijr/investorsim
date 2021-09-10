import { NavLink } from 'react-router-dom';

/**
 * Basic info and links for each section of the game.
 * @returns
 */
function Areas() {
  return (
    <div className="my-6 flex flex-row justify-between">
      <h2>
        <NavLink to="/assets">Assets</NavLink>
      </h2>
      <h2>
        <NavLink to="/investments">Investments</NavLink>
      </h2>
      <h2>
        <NavLink to="/algorithms">Algorithms</NavLink>
      </h2>
    </div>
  );
}

export default Areas;
