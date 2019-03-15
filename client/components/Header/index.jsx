// react lib imports
import React from 'react';

// third-party lib imports
import { Link } from '@reach/router';

// styles
import './Header.scss';

/**
 * The Header component primarily used for navigation between pages
 *
 * @returns {JSX} JSX
 */
const Header = ({ onSearchChange, handleSearch, search }) =>  (
  <div className="header__container">
    <h3>Contact List</h3>
    <ul className="menu__container">
      <li className="menu__container__items">
        <Link to="/">Home</Link>
      </li>
      <li className="menu__container__items">
        <Link to="/contact">Add Contact</Link>
      </li>
    </ul>
  </div>
);

export default Header;
