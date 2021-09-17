import React from 'react'
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
          <NavLink className="tab" to="/assets">
            Assets
          </NavLink>
        </h2>
      </div>
      <div>
        <h2>
          <NavLink className="tab" to="/credit">
            Credit
          </NavLink>
        </h2>
      </div>
      <div>
        <h2>
          <NavLink className="tab" to="/algorithms">
            Algorithms
          </NavLink>
        </h2>
      </div>
    </div>
  );
}

export default Areas;
