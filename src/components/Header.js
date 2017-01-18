/**
 * Created by Chris Dorward on 15/01/2017
 * Header
 */

import React, { PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

function Header() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><img alt="Cancer Council NSW Logo" src="/img/CCNSW_Logo.png" height="80" /></Link>
        </Navbar.Brand>
         <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <div className="pushtop">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Builder</Link>
            </li>

            <li>
              <Link to="/recipies">Recipies &amp; Ideas</Link>
            </li>
            <li>
              <Link to="/tips">Tips</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
};

export default Header;

/*
<Nav>
  <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Cat 1</MenuItem>
      <MenuItem eventKey={3.2}>Another Cat</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
    </NavDropdown>
</Nav>
*/
