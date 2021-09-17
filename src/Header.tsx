import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Header() {
  return (
    <header className="px-8 mt-2">
      <ul className="flex flex-row justify-between">
        <li>InvestorSim</li>
        <li>
          <a
            className="flex items-center"
            href="https://github.com/fotijr/investorsim"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="inline mr-2" />
            Code
          </a>
        </li>
        <li>
          <a
            className="flex items-center"
            href="https://fotijr.com/blog/2021/investorsim/"
            target="_blank"
            rel="noreferrer"
          >
            What is this?
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
